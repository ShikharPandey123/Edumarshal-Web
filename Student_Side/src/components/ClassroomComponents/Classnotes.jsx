import { useEffect, useState } from "react";
import ClassnotesCard from "./ClassnotesCard";
import ClassnotesTable from "./ClassnotesTable";
import axios from "axios";
import ClassnotesPdf from "./ClassnotesPdf";

const Classnotes = () => {
  const [pageName, setPageName] = useState("All Class Notes");
  const [classNotes, setClassNotes] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [pdfLink, setPdfLink] = useState("");

  const resetName = () => {
    setPageName("All Class Notes");
  };

  useEffect(() => {
    getClassnotes();
  }, []);

  const getClassnotes = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_API + "/v1/student/classNotes", {
        withCredentials: true,
      })
      .then((res) => {
        const responseData = res.data.classNotes;
        setClassNotes(responseData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Filter to get unique subjects
  const uniqueClassNotes = [];
  const subjectNames = new Set();

  classNotes.forEach((note) => {
    if (note.subject && !subjectNames.has(note.subject.name)) {
      subjectNames.add(note.subject.name);
      uniqueClassNotes.push(note);
    }
  });

  return (
    <div className="bg-[#ffffff] w-full md:h-[80vh] items-center justify-center px-5 rounded-3xl mx-4 mt-4">
      
      {pageName === "All Class Notes" && (
        <div className="w-full flex justify-center md:justify-start items-center">
          <div className="w-full grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {uniqueClassNotes.length > 0
              ? uniqueClassNotes.map((note, index) => (
                  <ClassnotesCard
                    key={index}
                    setPageName={setPageName}
                    subjectName={note.subject.name}
                    setSubjectName={setSubjectName}
                  />
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse w-full flex flex-col justify-center rounded-[15px] shadow-lg border border-[#c9c1f1] p-4 m-4"
                  >
                    <div className="bg-blue-200 h-8 w-2/3 mb-8 rounded"></div>
                    
                    <div className="bg-blue-200 h-4 w-5/6 mb-4 rounded"></div>
                    <div className="bg-blue-200 h-10 w-4/5 mb-5 mt-5 rounded-[10px]"></div>
                    <div className="bg-blue-200 h-10 w-4/5 mt-2 mb-5 rounded-[10px]"></div>
                  </div>
                ))}
          </div>
        </div>
      )}
      {pageName !== "All Class Notes" && pageName !== "Notes" && (
        <ClassnotesTable
          subjectName={pageName}
          setPageName={(name) => {
            setPageName(name);
            const selectedNote = classNotes.find(
              (note) => note.subject && note.subject.name === name
            );
            if (selectedNote) {
              setPdfLink(selectedNote.classnotes);
            }
          }}
        />
      )}
      {pageName === "Notes" && (
        <ClassnotesPdf subjectName={subjectName} link={pdfLink} />
      )}
    </div>
  );
};

export default Classnotes;
