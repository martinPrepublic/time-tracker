import { PlasmoCSConfig } from "plasmo"
import React from "react"

import TimeTracker from "~components/timeTracker/TimeTracker"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

function IndexPopup() {


  return <TimeTracker />
}

export default IndexPopup
