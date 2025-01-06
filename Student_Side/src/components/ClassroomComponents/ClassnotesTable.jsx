import React, { useEffect, useState } from 'react';
import folderIcon from '../../assets/classNotesFolder1.svg';
import axios from 'axios';

function ClassnotesTable({ subjectName, setPageName }) {
  const [classNotes, setClassNotes] = useState([]);

  useEffect(() => {
    getClassnotes();
  }, []);

  const getClassnotes = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_API + "/v1/student/classNotes", {
        withCredentials: true,
      })
      .then((res) => {
        const responseData1 = res.data.classNotes;
        setClassNotes(responseData1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const filteredClassNotes = classNotes.filter(note => note.subject.name === subjectName);

  return (
    <div className=''>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-lg">
            <th className="px-5 py-4 text-center">Subject</th>
            <th className="px-5 py-4 text-center">Last Modified</th>
            <th className="px-5 py-4 text-center">File Size</th>
            <th className="px-5 py-4 text-center">Download</th>
          </tr>
          <tr>
            <td colSpan="4">
              <div className="ml-8 w-[96%] h-[1px] bg-[#000000]"></div>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredClassNotes.map((note, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center">
                    <img
                      src={folderIcon}
                      className="mr-1 cursor-pointer"
                      alt=""
                      onClick={() => {
                        setPageName("Notes");
                      }}
                    />
                    <span>{note.subject.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span>27/04/2024</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span>24 MB</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <a href={note.classnotes} download>Download</a>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div className="ml-8 w-[96%] h-[1px] bg-[#000000]"></div>
                </td>        
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassnotesTable;
