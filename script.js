// Function to add a task
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
      alert('Please enter a task.');
      return;
  }

  const task = {
      id: Date.now(),
      title: taskText,
      completed: false,
      dateAdded: new Date().toLocaleString()
  };

  renderTask(task, false);
  taskInput.value = '';
}

// Function to render tasks
function renderTask(task, isCompleted) {
  const taskList = isCompleted ? document.getElementById('completed-tasks') : document.getElementById('pending-tasks');
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';
  taskItem.setAttribute('data-id', task.id);

  const taskTitle = document.createElement('span');
  taskTitle.textContent = `${task.title} (Added: ${task.dateAdded})`;
  taskItem.appendChild(taskTitle);

  if (!isCompleted) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.onclick = () => completeTask(taskItem);
      taskItem.appendChild(completeBtn);
  } else {
      taskTitle.classList.add('completed');
      taskTitle.textContent = `${task.title} (Completed: ${task.dateCompleted})`;
  }

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => editTask(taskItem);
  taskItem.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteTask(taskItem);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);
}

// Function to complete a task
function completeTask(taskItem) {
  const taskId = taskItem.getAttribute('data-id');
  taskItem.remove();

  const completedTask = {
      id: taskId,
      title: taskItem.querySelector('span').textContent,
      completed: true,
      dateCompleted: new Date().toLocaleString()
  };

  renderTask(completedTask, true);
}

// Function to edit a task
function editTask(taskItem) {
  const taskTitle = taskItem.querySelector('span');
  const newTitle = prompt('Edit your task:', taskTitle.textContent);

  if (newTitle && newTitle.trim() !== '') {
      taskTitle.textContent = newTitle.trim();
  }
}

// Function to delete a task
function deleteTask(taskItem) {
  taskItem.remove();
}
