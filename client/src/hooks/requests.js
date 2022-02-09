const API_URL = 'http://localhost:8000/v1'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`)
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches =  await response.json();
  return fetchedLaunches.sort((a,b) => {
    return a.flighttNumber -b.flighttNumber
  })
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),
    })
  } catch (error) {
    return {
      ok: false
    }
    
  }
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    return {
      ok: false

    }
    
  }
  
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};