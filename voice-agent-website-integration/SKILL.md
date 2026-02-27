---
name: voice-agent-website-integration
version: 1.0.0
title: Voice Agent Website Integration
description: Integrate AI voice agents into contractor websites. Covers ElevenLabs, VAPI, Bland.ai, and Retell AI voice platforms — embedding widgets, configuring inbound/outbound call agents, GoHighLevel CRM webhook integration, and lead capture flows. Primary use case: contractor client websites (roofing, insulation, HVAC).
tags: [voice, ai-voice, vapi, elevenlabs, bland-ai, retell, website, integration, contractor, leads, ghl]
author: Keplr
---

# Voice Agent Website Integration

## Overview
A voice agent on a contractor website acts as a 24/7 receptionist — answering calls, qualifying leads, booking estimates, and routing urgent requests. This skill covers integrating popular AI voice platforms into contractor websites and connecting them to GoHighLevel CRM.

## Platform Comparison

| Platform | Best For | Pricing Model | GHL Integration |
|---|---|---|---|
| **VAPI** | Developers, full control, complex flows | Per minute | Webhook → GHL |
| **ElevenLabs** | Voice quality, brand voice cloning | Per character/min | Webhook → GHL |
| **Bland.ai** | Simple setup, contractor use cases | Per minute | Native + Webhook |
| **Retell AI** | Enterprise, low latency | Per minute | Webhook → GHL |

**Recommended for contractors: VAPI or Bland.ai** — good balance of simplicity, contractor-friendly templates, and GHL integration.

---

## VAPI Integration

### 1. Create VAPI Assistant
```python
import requests

VAPI_API_KEY = ""  # from app.vapi.ai

headers = {
    "Authorization": f"Bearer {VAPI_API_KEY}",
    "Content-Type": "application/json"
}

# Create assistant
assistant_payload = {
    "name": "[Company] Receptionist",
    "model": {
        "provider": "openai",
        "model": "gpt-4o-mini",  # fast + cheap for voice
        "systemPrompt": """You are a friendly receptionist for [Company Name], 
        a [service] company serving [city/area]. Your job is to:
        1. Greet callers warmly
        2. Find out what they need (estimate, question, emergency)
        3. Collect their name, phone, address, and brief description
        4. Book them for a free estimate or route urgent calls
        5. Always be professional, friendly, and helpful
        
        Do NOT give prices over the phone — always say a tech will provide a free estimate.
        For emergencies (active leak, no heat in winter), say you'll have someone call back immediately."""
    },
    "voice": {
        "provider": "11labs",
        "voiceId": "rachel"  # or clone client's voice
    },
    "firstMessage": "Thank you for calling [Company]! This is [Name], how can I help you today?",
    "endCallMessage": "Thank you for calling [Company]! We'll be in touch soon. Have a great day!",
    "endCallPhrases": ["goodbye", "bye", "talk later", "that's all"],
    "recordingEnabled": True,
    "hipaaEnabled": False
}

res = requests.post("https://api.vapi.ai/assistant", headers=headers, json=assistant_payload)
assistant = res.json()
print(f"Assistant ID: {assistant['id']}")
```

### 2. Create Phone Number
```python
# Buy/provision a number for the client
phone_payload = {
    "provider": "twilio",
    "areaCode": "555",  # use client's local area code
    "assistantId": assistant['id']
}

res = requests.post("https://api.vapi.ai/phone-number", headers=headers, json=phone_payload)
phone = res.json()
print(f"Phone number: {phone['number']}")
```

### 3. Embed Web Widget (Click-to-Call)
```html
<!-- Add to website <head> -->
<script>
  var vapiInstance = null;
  const assistant = "YOUR_ASSISTANT_ID";
  const apiKey = "YOUR_PUBLIC_KEY"; // Public key only - safe for frontend
  const buttonConfig = {
    position: "bottom-right",
    offset: "40px",
    width: "50px",
    height: "50px",
    idle: {
      color: "#1a6fc4",
      type: "pill",
      title: "Chat with us!",
      subtitle: "Talk to our AI assistant",
      icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg"
    },
    active: {
      color: "#e84646",
      type: "pill",
      title: "Call in progress",
      subtitle: "End the call",
      icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg"
    }
  };

  (function(d, t) {
    var g = document.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g, s);
    g.onload = function() {
      vapiInstance = window.vapiSDK.run({
        apiKey: apiKey,
        assistant: assistant,
        config: buttonConfig,
      });
    };
  })(document, "script");
</script>
```

### 4. Configure VAPI Webhook → GHL
```python
# Set server URL on assistant to receive call events
update_payload = {
    "serverUrl": "https://YOUR_GHL_WEBHOOK_URL",  # GHL webhook endpoint
    "serverUrlSecret": "your-webhook-secret"  # optional auth
}

res = requests.patch(
    f"https://api.vapi.ai/assistant/{assistant_id}",
    headers=headers,
    json=update_payload
)
```

### 5. VAPI Webhook Handler (Receive + Push to GHL)
```python
# Deploy this as a serverless function or on VPS
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

GHL_API_KEY = ""
GHL_LOCATION_ID = ""

@app.route('/vapi-webhook', methods=['POST'])
def vapi_webhook():
    event = request.json
    event_type = event.get('message', {}).get('type')
    
    if event_type == 'end-of-call-report':
        call = event['message']
        
        # Extract lead info from transcript analysis
        # (VAPI provides structured data if you configure tool calls)
        caller_name = call.get('analysis', {}).get('structuredData', {}).get('name', 'Unknown')
        caller_phone = call.get('customer', {}).get('number', '')
        summary = call.get('analysis', {}).get('summary', '')
        recording_url = call.get('recordingUrl', '')
        
        # Create contact in GHL
        contact_payload = {
            "firstName": caller_name.split()[0] if caller_name else 'Voice',
            "lastName": caller_name.split()[-1] if len(caller_name.split()) > 1 else 'Lead',
            "phone": caller_phone,
            "source": "Voice Agent - Website",
            "tags": ["voice-lead", "new"],
            "customField": {
                "call_summary": summary,
                "recording_url": recording_url
            }
        }
        
        ghl_headers = {
            "Authorization": f"Bearer {GHL_API_KEY}",
            "Content-Type": "application/json"
        }
        
        requests.post(
            "https://rest.gohighlevel.com/v1/contacts/",
            headers=ghl_headers,
            json=contact_payload
        )
        
        # Send immediate SMS follow-up via GHL
        # (use Scout's new lead speed sequence)
        
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(port=5000)
```

---

## Bland.ai Integration (Simpler Setup)

### 1. Create Inbound Agent
```python
import requests

BLAND_API_KEY = ""  # from app.bland.ai

headers = {"authorization": BLAND_API_KEY}

agent_payload = {
    "voice": "maya",  # natural female voice
    "language": "en-US",
    "task": """You are a receptionist for [Company Name], a [service] company in [City].
    Your goal is to:
    - Greet the caller warmly by name if they give it
    - Understand what they need (free estimate, question, emergency repair)
    - Collect: full name, best callback number, service address, brief description of what they need
    - For estimates: confirm we'll call them back within 1 hour to schedule
    - For emergencies: say a technician will call back immediately
    - Thank them and end the call professionally
    Never quote prices. Always offer a free, no-obligation estimate.""",
    "first_sentence": "Thank you for calling [Company]! How can I help you today?",
    "wait_for_greeting": True,
    "record": True,
    "webhook": "https://YOUR_WEBHOOK_URL/bland-webhook"
}

res = requests.post("https://api.bland.ai/v1/agents", headers=headers, json=agent_payload)
agent = res.json()
print(f"Agent ID: {agent['agent']['agent_id']}")
```

### 2. Buy Phone Number (Bland)
```python
number_payload = {
    "area_code": "555",
    "agent_id": agent['agent']['agent_id']
}
res = requests.post("https://api.bland.ai/v1/inbound/purchase", headers=headers, json=number_payload)
print(res.json())
```

### 3. Bland Webhook Handler
```python
@app.route('/bland-webhook', methods=['POST'])
def bland_webhook():
    data = request.json
    
    if data.get('status') == 'completed':
        transcript = data.get('transcripts', [])
        caller_phone = data.get('from', '')
        call_length = data.get('call_length', 0)
        recording_url = data.get('recording_url', '')
        
        # Parse transcript for lead info (use LLM or regex)
        # Create GHL contact (same as VAPI handler above)
        
    return jsonify({"status": "ok"})
```

---

## WordPress Integration

### Add VAPI Widget to WordPress
```php
// Add to functions.php or via Code Snippets plugin
function add_vapi_voice_agent() {
    if (!is_admin()) {
        ?>
        <script>
          // paste VAPI embed script here
        </script>
        <?php
    }
}
add_action('wp_footer', 'add_vapi_voice_agent');
```

### Add via Elementor/Divi Custom Code Widget
```
1. Elementor: Add HTML widget → paste VAPI script
2. Divi: Add Code module in footer section → paste script
3. WPBakery: Add Raw HTML element → paste script
4. Simple: Appearance > Theme Editor > footer.php before </body>
```

### Add to Custom HTML Site
```html
<!-- Paste before </body> tag in every page, OR in footer template -->
<script>
  // VAPI or Bland embed script
</script>
```

---

## GHL Missed Call Text-Back (Complement to Voice Agent)
```
In GoHighLevel Automation:

Trigger: Missed call (inbound)
Condition: Call not answered within 20 seconds

Step 1: SMS — immediately
  "Hi! You just called [Company]. We're busy helping another customer.
   We'll call you back ASAP! Or text us here — we respond fast. 😊"

Step 2: Create task — immediately  
  "Return missed call from [phone]"

Step 3: Create contact if not exists
  Tags: ["missed-call", "new-lead"]
```

---

## Voice Agent Script Templates

### Roofing Contractor Script
```
Greeting: "Thank you for calling [Company], your local roofing experts! 
I'm [Name], how can I help you today?"

Qualifying questions:
- "Is this for your home or a commercial property?"
- "Are you dealing with an active leak or is this for a routine inspection/replacement?"
- "What's the best address for the property?"
- "And what's the best number to reach you?"
- "Can I get your name?"

For insurance claims:
- "Have you already filed a claim with your insurance company?"
- "We work directly with insurance adjusters — we make the process easy for you."

Booking:
- "Fantastic! I'll have one of our roofing specialists give you a call back 
  within the hour to schedule your FREE inspection. Does that work for you?"
```

### Insulation Contractor Script
```
Greeting: "Thanks for calling [Company]! We help homeowners save on 
energy bills with professional insulation. How can I help you today?"

Qualifying questions:
- "What type of space are you looking to insulate? Attic, walls, crawl space?"
- "Are you seeing high energy bills or is this a new construction project?"
- "Have you heard about the available utility rebates for insulation upgrades?"
- "What's the property address?"
- "And your name and best callback number?"

Energy rebate hook:
- "Great news — many of our customers qualify for utility rebates that 
  can cover 20-30% of the cost. Our estimator will go over that with you."

Booking:
- "Perfect. I'll have our insulation specialist call you back within the hour 
  to schedule your FREE energy assessment. No obligation, of course."
```

---

## Testing Checklist
```
[ ] Call the provisioned phone number from a real phone
[ ] Test web widget click-to-call on mobile and desktop
[ ] Verify call is recorded
[ ] Verify webhook fires after call ends
[ ] Verify GHL contact is created with correct source tag
[ ] Verify GHL automation fires (SMS response sent)
[ ] Verify recording URL is captured in GHL contact notes
[ ] Test with bad audio / background noise (contractor environments)
[ ] Test emergency scenario — does agent escalate properly?
[ ] Verify phone number appears correctly in GHL as "Voice Agent - Website"
[ ] Test missed call text-back automation
```

## Costs (Approximate)
- VAPI: ~$0.05-0.10/min (includes STT + LLM + TTS)
- Bland.ai: ~$0.09/min
- Phone number: ~$2-5/month
- Average contractor call: 2-4 minutes
- 100 calls/month ≈ $20-40/month total
- Well worth it for a single closed job worth $5,000-$25,000
