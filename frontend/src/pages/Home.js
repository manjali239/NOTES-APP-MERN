import { useEffect } from 'react';
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import NotesDetails from '../components/NotesDetails';
import NotesForm from '../components/NotesForm';

const Home = () => {
  const { notes, dispatch } = useNotesContext(); // Ensure notes is plural for state
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchNotes = async () => { // Renamed to fetchNotes for clarity
      const response = await fetch('/api/notes', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json });
      }
    };

    if (user) {
      fetchNotes(); // Call the renamed function
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="notes">
        {notes && notes.map((note) => ( // Fixed singular variable
          <NotesDetails key={note._id} note={note} /> // Passed as note, not notes
        ))}
      </div>
      <NotesForm />
    </div>
  );
};

export default Home;
