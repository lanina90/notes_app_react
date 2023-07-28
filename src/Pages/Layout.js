import React, {useState} from 'react';
import TableComponent from "../Components/TableComponent";
import CreateNoteForm from "../Components/Forms/CreateNoteForm";

const Layout = () => {

  const [isCreateFromOpen, setIsCreateFromOpen] = useState(false)

  return (
    < >
      <TableComponent  headers={[
        "Name",
        "Created",
        "Category",
        "Content",
        "Dates",
        " ",
        <img className="pic" src="/images/archived_white.svg" alt="archive"/>,
        <img className="pic" src="/images/remove_white.svg" alt="remove"/>
      ] }
      />
      <div className="create-btn">
        <button
          onClick={() => setIsCreateFromOpen(true)}
        >Create Note</button>
      </div>
      {isCreateFromOpen && <CreateNoteForm setIsCreateFromOpen={setIsCreateFromOpen}/>}

      <TableComponent
        headers={[
          "Name",
          "Created",
          "Category",
          "Content",
          "Dates",
          <img className="pic" src="/images/unarchive_icon.svg" alt="unarchive"/>,
        ]}
        showArchived={true}
      />

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
    </>
  );
};

export default Layout;