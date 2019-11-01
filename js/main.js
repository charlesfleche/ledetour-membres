'use strict';

(async function() {
  const ELEMENT_ID_UPDATED_AT = "updated-at"
  const ELEMENT_ID_EXCEPTION = "exception"

  const MEMBERS_DATA_URL = '/members.json'
  const FETCH_STATUS_FETCHING = 'fetching'
  const FETCH_STATUS_READY = 'ready'
  const FETCH_STATUS_ERROR = 'error'

  function setFetchingStatus(status) {
    document.body.dataset.fetchingStatus = status
  }

  function setMembersData(membersData) {
    setUpdateDate(membersData.updated_at)
    document.body.dataset.fetchingStatus = status
  }

  function setUpdateDate(dateISOString) {
    const el = document.getElementById(ELEMENT_ID_UPDATED_AT)

    el.datetime = dateISOString

    const date = new Date(dateISOString)
    el.innerText = date.toLocaleString()
  }

  function setExceptionMessage(exception) {
    document.getElementById(ELEMENT_ID_EXCEPTION).innerText = exception.message
  }

  async function fetchMembersData(membersDataUrl) {
    const resp = await fetch(MEMBERS_DATA_URL)
    if (resp.ok) {
      return await resp.json()
    }
    throw new Error(`${resp.url} failed with status ${resp.status}: ${resp.statusText}`)
  }

  setFetchingStatus(FETCH_STATUS_FETCHING)
  try {
    setMembersData(await fetchMembersData(MEMBERS_DATA_URL))
    setFetchingStatus(FETCH_STATUS_READY)
  }
  catch (e) {
    setFetchingStatus(FETCH_STATUS_ERROR)
    setExceptionMessage(e)
    throw e
  }
})()
