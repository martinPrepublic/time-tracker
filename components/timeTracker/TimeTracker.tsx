import React, { useEffect } from "react"
import { useRef, useState } from "react"

import { getUsers } from "~auth/authHelper"

// import "./TimeTracker.css";

const TimeTracker = () => {
  const [showTimeTracker, setShowTimeTracker] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("00:00:00")
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [savedData, setSavedData] = useState([])
  const [showTimeTrackerTable, setShowTimeTrackerTable] = useState(false)



  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedData") || "[]")
    setSavedData(savedData)
  }, [])

  const startTimer = () => {
    let seconds = 0
    timerRef.current = setInterval(() => {
      seconds++
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      setTime(
        `${hours.toString().padStart(2, "0")}:${(minutes % 60)
          .toString()
          .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
      )
    }, 1000)
    setTimerRunning(true)
  }

  const handleTimeTrackerTable = () => {
    setShowTimeTrackerTable(true)
    setShowTimeTracker(false)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
      setTimerRunning(false)
    }
  }

  const handleClearTime = () => {
    setDescription("")
    setTitle("")
    setTime("00:00:00")
  }

  const handleButtonClick = () => {
    setShowTimeTracker(!showTimeTracker)
    setShowTimeTrackerTable(false)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleSaveButtonClick = () => {
    const newData = {
      title,
      description,
      time,
      timestamp: new Date().toISOString()
    }
    const updatedData = [...savedData, newData]
    setSavedData(updatedData)
    localStorage.setItem("savedData", JSON.stringify(updatedData))
    setShowTimeTracker(false)

    setTime("00:00:00")
    setTitle("")
    setDescription("")
  }

  return (
    <div>
      <button
        style={{
          width: 100,
          height: 30,
          backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "5px",
          right: "0px",
          color: "white",
          border: "none",
          outline: "none"
        }}
        onClick={handleButtonClick}>
        Click ME!!!!
      </button>
      {showTimeTracker && (
        <div
          style={{
            position: "fixed",
            right: 0,
            width: "300px",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            transition: "transform 0.5s",
            transform: "translateY(100%)"
          }}>
          <h2>Time Tracker</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}>
            <label htmlFor="time">Time:</label>
            {time}
          </div>
          {!timerRunning && (
            <>
              <button
                className="time-tracker-start-button"
                onClick={startTimer}>
                Start
              </button>
              <button onClick={handleClearTime}>Clear</button>
              <button onClick={handleSaveButtonClick}>Save</button>
              <button onClick={handleTimeTrackerTable}>Show Table</button>
            </>
          )}
          {timerRunning && (
            <>
              <button className="time-tracker-stop-button" onClick={stopTimer}>
                Stop
              </button>
            </>
          )}
        </div>
      )}
      {showTimeTrackerTable && (
        <div
          style={{
            position: "fixed",
            right: 0,
            width: "auto",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            transition: "transform 0.5s",
            transform: "translateY(100%)"
          }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.time}</td>
                  <td>{new Date(data.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
        </div>
      )}
    </div>
  )
}

export default TimeTracker
