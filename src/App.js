import { useState, useMemo } from 'react';

function App() {
  const [tasks, setTasks] = useState([{ content: 'Learn react', isDone: false, id: Date.now() }]);
  const [keyword, setKeyword] = useState('');

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks)
  }

  const submitTask = (e) => {
    e.preventDefault();

    if (keyword.trim() === '') return;

    const newTasks = [...tasks, { content: keyword, id: Date.now(), isDone: false }];
    setTasks(newTasks)
    setKeyword('')
  }

  const checkDoneTask = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task;

      return { ...task, isDone: !task.isDone }
    })
    setTasks(newTasks)
  }

  const unDoneTasks = useMemo(() => {
    return tasks.filter(t => !t.isDone).length;
  }, [tasks])

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <form onSubmit={submitTask}>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Enter new todo"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              <button className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            {unDoneTasks > 0 ? <h5>There {unDoneTasks > 1 ? 'are' : 'is'}  {unDoneTasks} task{unDoneTasks > 1 ? 's' : ''} to complete</h5> : <h4>All tasks are done</h4>}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-12">
            <ul className="list-group">
              {tasks.map(task => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <input className="form-check-input me-2" type="checkbox" onChange={() => checkDoneTask(task.id)} />
                    <span className={task.isDone ? 'text-decoration-line-through' : ''}>{task.content}</span>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
