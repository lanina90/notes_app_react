
import './App.css';
import TableComponent from "./Components/TableComponent";

function App() {
  return (
    <div className="container">
      <TableComponent  headers={[
        "Name",
        "Created",
        "Category",
        "Content",
        "Dates",
        " ",
        <img className="pic" src="/images/archived_white.svg" alt="archive"/>,
        <img className="pic" src="/images/remove_white.svg" alt="remove"/>
      ]} />
        <div className="create-btn">
          <button id="create-note-btn">Create Note</button>
        </div>
      <section>
        <form id="note-form" style={{display: 'none'}}>
          <label htmlFor="title">Name</label>
          <input type="text" id="title" name="title" required/>
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
              <option value="Task">Task</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Idea">Idea</option>
              <option value="Quote">Quote</option>
            </select>
            <label htmlFor="content">Notes</label>
            <input type="text" id="content" name="content" required/>
              <button type="submit">Add Note</button>
        </form>
      </section>

      <section id="archived-notes-section">
        <h2>Archived Notes</h2>
        <table id="archived-notes" className="notes">
          <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th>
              <img className="pic" src="assets/images/unarchive_icon.svg" alt="archive"/>
            </th>
          </tr>
          </thead>
          <tbody id="archived-notes-body"></tbody>
        </table>
      </section>

      <section>
        <table id="summary" className="notes">
          <thead>
          <tr>
            <th>Note Category</th>
            <th>Active</th>
            <th>Archived</th>
            </tr>
          </thead>
          <tbody id="summary-body"></tbody>
        </table>
      </section>

    </div>
  )
}

export default App;
