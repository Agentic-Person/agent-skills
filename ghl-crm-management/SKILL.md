---
name: ghl-crm-management
version: 1.0.0
title: GoHighLevel CRM Management
description: Manage GoHighLevel (GHL) CRM accounts for contractor clients — pipeline setup, automations, email/SMS sequences, lead tracking, booking flows, and reporting. Primary tool for Scout (Lead Gen + CRM Manager) in Milton's Division.
tags: [crm, ghl, gohighlevel, leads, automation, email, sms, pipeline, contractor, roofing, trades]
author: Keplr
---

# GoHighLevel CRM Management

## Overview
GoHighLevel (GHL) is the all-in-one CRM and marketing automation platform used for all contractor clients. Each client has their own GHL account. This skill covers pipeline management, automation setup, contact management, email/SMS sequences, and reporting.

**Scout owns GHL for each client.** Sage writes copy; Scout builds and deploys sequences.

## Access Patterns

### API Authentication
```python
import requests

GHL_API_KEY = ""  # Per-client API key from GHL Settings > API
GHL_BASE_URL = "https://rest.gohighlevel.com/v1"
LOCATION_ID = ""  # GHL Settings > Business Info > Location ID

headers = {
    "Authorization": f"Bearer {GHL_API_KEY}",
    "Content-Type": "application/json"
}
```

### Get All Contacts
```python
def get_contacts(limit=100, skip=0):
    res = requests.get(
        f"{GHL_BASE_URL}/contacts/",
        headers=headers,
        params={"limit": limit, "skip": skip}
    )
    return res.json()
```

### Search Contact by Phone/Email
```python
def find_contact(query):
    res = requests.get(
        f"{GHL_BASE_URL}/contacts/search",
        headers=headers,
        params={"query": query}
    )
    return res.json()
```

### Create New Contact
```python
def create_contact(first_name, last_name, phone, email, source, tags=[]):
    payload = {
        "firstName": first_name,
        "lastName": last_name,
        "phone": phone,         # E.164 format: +15551234567
        "email": email,
        "source": source,       # e.g. "Website Form", "Google LSA", "Facebook Ad"
        "tags": tags            # e.g. ["roofing", "storm-lead", "new"]
    }
    res = requests.post(f"{GHL_BASE_URL}/contacts/", headers=headers, json=payload)
    return res.json()
```

### Update Contact
```python
def update_contact(contact_id, updates: dict):
    res = requests.put(
        f"{GHL_BASE_URL}/contacts/{contact_id}",
        headers=headers,
        json=updates
    )
    return res.json()
```

### Add Tags to Contact
```python
def add_tags(contact_id, tags: list):
    res = requests.post(
        f"{GHL_BASE_URL}/contacts/{contact_id}/tags",
        headers=headers,
        json={"tags": tags}
    )
    return res.json()
```

---

## Pipeline Management

### Standard Contractor Pipeline Stages
```
1. New Lead         — just came in, not yet contacted
2. Contacted        — reached out, awaiting response
3. Appointment Set  — estimate/site visit booked
4. Estimate Sent    — proposal delivered, awaiting decision
5. Negotiating      — active back-and-forth
6. Won              — job sold, deposit taken
7. Lost             — declined or unresponsive (closed lost)
8. Reactivation     — old lost lead being re-engaged
```

### Get Pipelines
```python
def get_pipelines():
    res = requests.get(f"{GHL_BASE_URL}/pipelines/", headers=headers)
    return res.json()
```

### Get Opportunities in Pipeline
```python
def get_opportunities(pipeline_id, stage_id=None, limit=100):
    params = {"pipelineId": pipeline_id, "limit": limit}
    if stage_id:
        params["stageId"] = stage_id
    res = requests.get(
        f"{GHL_BASE_URL}/pipelines/opportunities",
        headers=headers,
        params=params
    )
    return res.json()
```

### Create Opportunity (Move Lead Into Pipeline)
```python
def create_opportunity(contact_id, pipeline_id, stage_id, name, monetary_value=0):
    payload = {
        "pipelineId": pipeline_id,
        "locationId": LOCATION_ID,
        "name": name,
        "pipelineStageId": stage_id,
        "contactId": contact_id,
        "monetaryValue": monetary_value,
        "status": "open"
    }
    res = requests.post(
        f"{GHL_BASE_URL}/pipelines/opportunities",
        headers=headers,
        json=payload
    )
    return res.json()
```

### Move Opportunity to New Stage
```python
def move_to_stage(opportunity_id, new_stage_id):
    res = requests.put(
        f"{GHL_BASE_URL}/pipelines/opportunities/{opportunity_id}",
        headers=headers,
        json={"pipelineStageId": new_stage_id}
    )
    return res.json()
```

---

## Sending Messages

### Send SMS to Contact
```python
def send_sms(contact_id, message):
    payload = {
        "type": "SMS",
        "message": message,
        "contactId": contact_id
    }
    res = requests.post(
        f"{GHL_BASE_URL}/conversations/messages",
        headers=headers,
        json=payload
    )
    return res.json()
```

### Send Email to Contact
```python
def send_email(contact_id, subject, html_body, from_name, from_email):
    payload = {
        "type": "Email",
        "subject": subject,
        "html": html_body,
        "contactId": contact_id,
        "from": from_email,
        "fromName": from_name
    }
    res = requests.post(
        f"{GHL_BASE_URL}/conversations/messages",
        headers=headers,
        json=payload
    )
    return res.json()
```

---

## Standard Automation Sequences

### 1. New Lead Speed Sequence (Critical — Roofing especially)
```
Trigger: Form submitted OR lead ad form filled

Step 1: SMS — 0 min delay
  "Hi [firstName]! This is [CompanyName]. We got your request and 
   we're on it! We'll call shortly to schedule your FREE estimate.
   Questions? Just reply here."

Step 2: Email — 5 min delay
  Subject: "Your Free Estimate Request — [CompanyName]"
  Body: Confirmation + what to expect + booking calendar link

Step 3: Internal notification — 0 min
  Alert client owner: new lead from [source], contact info

Step 4: Task — 30 min delay
  "Call [firstName] at [phone] — new lead follow-up"
```

### 2. No-Response Follow-Up Sequence
```
Trigger: Lead in "New Lead" stage for 24 hours, no reply

Day 1 SMS: "Hi [firstName], still happy to get you a free estimate. What day works?"
Day 2 Email: "Still interested in your free estimate?"
Day 4 SMS: "[firstName] — last check-in! We have openings this week."
Day 7: Tag "unresponsive" → Move to Reactivation pipeline
```

### 3. Post-Job Review Request
```
Trigger: Opportunity moved to "Won"

Day 3 SMS: "Hope you love your new [service]! Mind leaving us a 
            quick Google review? [link] — means the world to us!"
Day 5 Email: "How did we do, [firstName]?" — review links + photos
Action: Tag "review-requested"
```

### 4. Monthly Reactivation Campaign
```
Trigger: Tag "unresponsive" AND last contact > 30 days ago

SMS: "Hi [firstName]! [CompanyName] here. [Seasonal hook — e.g., 
      'Storm season is coming and we have special pricing this month']. 
      Still interested in that free estimate?"
```

### 5. Appointment Reminder Sequence
```
Trigger: Appointment booked in GHL calendar

Immediate SMS: Confirmation with date/time/address
24hr before SMS: Reminder with time
1hr before SMS: "We're heading your way! [tech] arrives around [time]."
```

---

## Reporting

### Weekly Lead Report
```python
from datetime import datetime, timedelta

def weekly_lead_report(pipeline_id):
    week_ago = (datetime.now() - timedelta(days=7)).isoformat() + "Z"
    all_opps = get_opportunities(pipeline_id, limit=500)
    
    new_leads = [
        o for o in all_opps.get('opportunities', [])
        if o.get('createdAt', '') >= week_ago
    ]
    
    by_stage, by_source = {}, {}
    for opp in new_leads:
        stage = opp.get('pipelineStage', {}).get('name', 'Unknown')
        source = opp.get('contact', {}).get('source', 'Unknown')
        by_stage[stage] = by_stage.get(stage, 0) + 1
        by_source[source] = by_source.get(source, 0) + 1
    
    return {
        "total_new_leads": len(new_leads),
        "by_stage": by_stage,
        "by_source": by_source,
        "pipeline_value": sum(o.get('monetaryValue', 0) for o in new_leads)
    }
```

### Conversion Funnel
```python
def conversion_funnel(pipeline_id):
    all_opps = get_opportunities(pipeline_id, limit=1000)
    stages = {}
    for opp in all_opps.get('opportunities', []):
        stage = opp.get('pipelineStage', {}).get('name', 'Unknown')
        stages[stage] = stages.get(stage, 0) + 1
    
    stage_order = ['New Lead','Contacted','Appointment Set',
                   'Estimate Sent','Negotiating','Won']
    total = max(stages.get('New Lead', 1), 1)
    return {
        stage: {"count": stages.get(stage, 0),
                "rate": f"{round(stages.get(stage, 0) / total * 100, 1)}%"}
        for stage in stage_order
    }
```

---

## New Client GHL Setup Checklist
```
[ ] Create GHL account or sub-account (agency structure)
[ ] Set business info: name, address, phone, timezone
[ ] Add SMS-enabled phone number (Twilio provisioned in GHL)
[ ] Connect sending domain + warm up email reputation (2-4 weeks)
[ ] Import existing contacts (CSV)
[ ] Create pipeline with standard contractor stages
[ ] Build all 5 automation sequences above
[ ] Connect website forms → GHL (webhook or native embed)
[ ] Connect Facebook Lead Ads → GHL (native integration)
[ ] Connect Google LSA → GHL (Zapier or webhook)
[ ] Set up missed call text-back automation
[ ] Configure GHL booking calendar
[ ] Add booking link to website + email signatures
[ ] Test full lead flow end-to-end
[ ] Schedule weekly report
[ ] Brief client on GHL mobile app
```

## Common GHL Gotchas
- Phone numbers **must** be E.164 format (+15551234567) — SMS fails silently otherwise
- Email warm-up takes 2-4 weeks — never blast cold on day 1
- Workflow triggers fire on creation AND updates — add conditions to avoid double-firing
- GHL API rate limit: 100 req/10s — throttle bulk imports with `time.sleep(0.1)`
- Location ID required for most API calls — Settings > Business Info > Location ID
- Recording calls requires Twilio compliance setup in GHL settings

## Resources
- GHL API Docs: https://highlevel.stoplight.io/docs/integrations
- GHL V2 API (newer): https://developers.gohighlevel.com
- GHL Community: https://ideas.gohighlevel.com
- Zapier GHL: https://zapier.com/apps/gohighlevel/integrations
