#!/bin/bash
cd /home/kavia/workspace/code-generation/streamease-video-player-221864-221873/video_streaming_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

