import React, {useState} from 'react';
import TableComponent from "../Components/TableComponents/TableComponent";
import CreateNoteForm from "../Components/Forms/CreateNoteForm";

const Layout = () => {

  const [isCreateFromOpen, setIsCreateFromOpen] = useState(false)

  return (
    <>
      <TableComponent
        headers={[
        "Name",
        "Created",
        "Category",
        "Content",
        "Dates",
        " ",
        <img className="pic" src="/images/archived_white.svg" alt="archive"/>,
        <img className="pic" src="/images/remove_white.svg" alt="remove"/>
      ] }
        tableShowFor = 'unarchived'

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
        tableShowFor = 'archived'
      />

      <TableComponent
        headers={[
          "Note Category",
          "Active",
          "Archived"
        ]}
        tableShowFor = 'summary'
      />

    </>
  );
};

export default Layout;