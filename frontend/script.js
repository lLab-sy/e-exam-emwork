document.addEventListener('DOMContentLoaded', fetchExams);

let exams = [];



function fetchExams() {
  fetch('http://localhost:3000/exams')
    .then(response => response.json())
    .then(data => {
      exams = data
      renderExams();
    })
    .catch(error => console.error('Error fetching exams:', error));
}

function renderExams() {
  let approvedCount = 0;
  let failCount = 0;
  let waitCount = 0;
  const examList = document.getElementById('examList');
  examList.innerHTML = '';
  exams.forEach(exam => {
    const examItem = document.createElement('div');
    const hasNullResult = Object.values(exam.result).some(value => value === null);
    let status = hasNullResult ? 'รอพิจารณา' : 'Approved';
    if(status == 'Approved'){
        const scoreA = (exam.result.color == 'P') + (exam.result.long == 'P') + (exam.result.slant == 'P') + (exam.result.reflex == 'P') 
        const scoreB = exam.result.sign + exam.result.line + exam.result.giving
        if(scoreA >= 3 && scoreB > 120 && exam.result.practice == 'P'){
            status = 'ผ่านการทดสอบ'
        }else{
            status = 'ไม่ผ่านการทดสอบ'
        }
    }
    const today = new Date().toLocaleDateString();
    const updatedAt = new Date(exam.updatedAt).toLocaleDateString();
    if (updatedAt === today) {
        if(status == 'ผ่านการทดสอบ'){
            approvedCount++
        }else if(status == 'ไม่ผ่านการทดสอบ'){
            failCount++
        }else{
            waitCount++
        }
    }
    examItem.classList.add('examItem');
    examItem.innerHTML = `
      <h3>${exam.name} ${exam.surname}</h3>
      <p>Status: ${status}</p>
      <p>Result:</p>
      <ul>
        <li>Color: ${exam.result.color}</li>
        <li>Long: ${exam.result.long}</li>
        <li>Slant: ${exam.result.slant}</li>
        <li>Reflex: ${exam.result.reflex}</li>
        <li>Sign: ${exam.result.sign}</li>
        <li>Line: ${exam.result.line}</li>
        <li>Giving: ${exam.result.giving}</li>
        <li>Practice: ${exam.result.practice}</li>
      </ul>
      <button onclick="showEditForm(${exam.id})">Edit</button>
      <button onclick="deleteExam(${exam.id})">Delete</button>
    `;
    examList.appendChild(examItem);
  });

  const examStatusDiv = document.getElementById('examStatus');
  examStatusDiv.innerHTML = `ผู้เข้ารับการทดสอบวันนี้จำนวน ${approvedCount+waitCount+failCount} คน ผ่านการทดสอบ ${approvedCount} คน ไม่ผ่านการทดสอบ ${failCount}`;
}

function showCreateForm() {
  document.getElementById('examForm').reset();
  document.getElementById('formTitle').textContent = 'Add Exam';
  document.getElementById('saveExamBtn').textContent = 'Save';
  document.getElementById('examFormContainer').classList.remove('hidden');
}

function showEditForm(id) {
  const exam = exams.find(exam => exam.id === id);
  if (exam) {
    document.getElementById('examId').value = exam.id;
    document.getElementById('examName').value = exam.name;
    document.getElementById('examSurname').value = exam.surname;
    document.getElementById('examColor').value = exam.result.color;
    document.getElementById('examLong').value = exam.result.long;
    document.getElementById('examSlant').value = exam.result.slant;
    document.getElementById('examReflex').value = exam.result.reflex;
    document.getElementById('examSign').value = exam.result.sign;
    document.getElementById('examLine').value = exam.result.line;
    document.getElementById('examGiving').value = exam.result.giving;
    document.getElementById('examPractice').value = exam.result.practice;
    document.getElementById('formTitle').textContent = 'Edit Exam';
    document.getElementById('saveExamBtn').textContent = 'Update';
    document.getElementById('examFormContainer').classList.remove('hidden');
  }
}

function hideForm() {
  document.getElementById('examFormContainer').classList.add('hidden');
}

function saveExam(event) {
//   event.preventDefault();
//   document.getElementById('examForm').reset()
//   const formData = new FormData(document.getElementById('examForm'));

  const id = document.getElementById('examId').value
  const method = id ? 'PUT' : 'POST';
  const url = id ? `http://localhost:3000/exams/${id}` : 'http://localhost:3000/exams';
  const examData = {
    name: document.getElementById('examName').value,
    surname: document.getElementById('examSurname').value,
    result: {
      color: document.getElementById('examColor').value,
      long: document.getElementById('examLong').value,
      slant: document.getElementById('examSlant').value,
      reflex: document.getElementById('examReflex').value,
      sign: parseInt(document.getElementById('examSign').value),
      line: parseInt(document.getElementById('examLine').value),
      giving: parseInt(document.getElementById('examGiving').value),
      practice: document.getElementById('examPractice').value
    }
  };

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(examData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to save exam.');
    }
    return response.json();
  })
  .then(() => {
    hideForm();
    fetchExams();
  })
  .catch(error => console.error('Error saving exam:', error));
}

function deleteExam(id) {
  if (confirm('Are you sure you want to delete this exam?')) {
    fetch(`http://localhost:3000/exams/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete exam.');
      }
      fetchExams();
    })
    .catch(error => console.error('Error deleting exam:', error));
  }
}

// Fetch exams initially when the page loads
fetchExams();
