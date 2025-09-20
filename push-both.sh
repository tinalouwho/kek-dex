#!/bin/bash
# Push to both AskKek (primary) and personal repositories

echo "Pushing to AskKek organization repository (primary)..."
git push origin main

echo "Pushing to personal repository..."
git push askkek main

echo "✅ Successfully pushed to both repositories!"