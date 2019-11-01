'use strict';

(async function() {
  const ELEMENT_ID_EXCEPTION = "exception"
  const ELEMENT_ID_KEYBOARD = "keyboard"
  const ELEMENT_ID_MEMBER = "member"
  const ELEMENT_ID_MEMBER_ACTIVE = "member-active"
  const ELEMENT_ID_MEMBER_HOURS = "member-hours"
  const ELEMENT_ID_SEARCH = "search"
  const ELEMENT_ID_UPDATED_AT = "updated-at"

  const MEMBERS_DATA_URL = '/members.json'
  const FETCH_STATUS_FETCHING = 'fetching'
  const FETCH_STATUS_READY = 'ready'
  const FETCH_STATUS_ERROR = 'error'

  let members = null

  function setFetchingStatus(status) {
    document.body.dataset.fetchingStatus = status
  }

  function setMembersData(membersData) {
    setUpdateDate(membersData.updated_at)
    document.body.dataset.fetchingStatus = status
    members = membersData.members
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

  function showMember(member) {
    let status = ""
    let hours = ""
    if (member) {
      status = member.active
      hours = member.hours_in_bank
    }

    document.getElementById(ELEMENT_ID_MEMBER).dataset.status = status
    document.getElementById(ELEMENT_ID_MEMBER_HOURS).innerText = hours
  }

  async function updateMembersData() {
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
  }

  function appendValueToMemberSearchField(value) {
    const el = document.getElementById(ELEMENT_ID_SEARCH)
    el.value += value
  }

  function resetMemberSearchField() {
    const el = document.getElementById(ELEMENT_ID_SEARCH)
    el.value = ""
  }

  function handleVirtualKeyboardKeyPress(ev) {
    const value = ev.target.dataset.value;
    if (value == 'cancel' || value == 'done') {
      resetMemberSearchField();
    } else {
      appendValueToMemberSearchField(value);
    }
    updateMemberView()
  }

  function updateMemberView() {
    const memberId = document.getElementById(ELEMENT_ID_SEARCH).value
    const member = members[memberId] || null
    showMember(member)
  }

  //

  document.getElementById(ELEMENT_ID_SEARCH).addEventListener("input", updateMemberView)

  for (const key of document.getElementById(ELEMENT_ID_KEYBOARD).children) {
    key.addEventListener("click", handleVirtualKeyboardKeyPress)
  }

  await updateMembersData()
})()
