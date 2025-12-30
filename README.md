# Serverless Event Announcement System on AWS

A fully serverless web application built with:

- **Amazon S3** – Static website hosting
- **Amazon API Gateway** – REST endpoints
- **AWS Lambda** – Backend logic (Python)
- **Amazon SNS** – Email notifications

## Features
- Subscribe via email to receive event alerts
- Admin creates events via web form
- Events stored in S3 as JSON
- Subscribers receive instant email notifications via SNS
- Real-time event list with auto-refresh

## Architecture
S3 → API Gateway → Lambda → (S3 + SNS)

## Setup (If Rebuilding)
1. Create S3 bucket with static hosting
2. Create SNS topic
3. Deploy two Lambda functions
4. Create API Gateway with /subscribe and /create-event
5. Upload these files to S3

**Note**: Replace `API_BASE` and `EVENTS_JSON_URL` in `script.js` with your actual URLs.

I built this as a portfolio project to demonstrate serverless architecture, IAM, CORS, and frontend integration.

December 2025

## Recommendation to Avoid Any Surprise Charges
Delete these when done:

1. Empty and delete the S3 bucket.
2. Delete the API Gateway API (and stage).
3. Delete the Lambda functions.
4. Delete the SNS topic (auto-removes subscriptions).




