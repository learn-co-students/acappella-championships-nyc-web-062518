document.addEventListener('DOMContentLoaded', ()=>{
// step 1 fetch - get list http://localhost:3000/a_cappella_groups
  fetch('http://localhost:3000/a_cappella_groups')
    .then(res => res.json())
    .then(data => displayDataObject(data))

// step 2 display on the page and fill the table with relevant information.
  const tableBody = document.getElementById('table-body')
  const displayDataObject = (data) => {
    data.forEach(dataObject => {
      let college = dataObject.college.name
      let groupName = dataObject.name
      let membership = dataObject.membership
      let division = dataObject.college.division
      let id = dataObject.id
      let tr = document.createElement('tr')
      tr.dataset.id = id
      tr.innerHTML = renderRow(college, groupName, membership, division, id)
      tableBody.appendChild(tr)
    })
  }

// step 3 render as table - Your table HTML might look something like this:
//   - <tr><td>*Insert College*</td> <td>*Insert Group Name*</td> <td>*Insert Membership*</td> <td>*Insert Division*</td> <td><img src='./assets/trophy.png' data-id='*put an id here*'/></td> </tr>
  const renderRow = (college, groupName, membership, division, id) => {
    return `<td>${college}</td>
    <td>${groupName}</td>
    <td>${membership}</td>
    <td>${division}</td>
    <td><img src='./assets/trophy.png' data-id='${id}'/></td>`
  }

// step 4 button eventlistner - On click of a button, remove(not really remove, just change the display to none) the associated group from the table and add it to the Winner h2.
  const winnerH2 = document.getElementById('winner')
  tableBody.addEventListener('click', e => {
    if(e.target.nodeName === "IMG") {
      let groupName = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
      let collegeName = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
      // step 5 If a new group is selected as winner, the new group should be removed from the table and replace the old group in the Winner h2. The old group should also return to the table. At any given time, all groups should be visible on the app, but each should appear only once.
      let tr = e.target.parentElement.parentElement
      let trs = [...tableBody.getElementsByTagName('tr')]
      winnerH2.innerText = `Winner: ${collegeName} ${groupName}`
      trs.forEach(tr => {
        tr.style.display = 'table-row'
      })
      tr.style.display = 'none'

    }
  })


// step 6 clicking on a table headers sort by that column attribute?
})
