import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";  // Change from usePhotosContext to useNotesContext
import { useAuthContext } from "../hooks/useAuthContext";

const NoteForm = () => {
  const { dispatch } = useNotesContext();  // Change from photos to notes
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // Changed 'description' to 'content'
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const noteData = { title, content };  // Removed file, now only title and content are required

    const response = await fetch('/api/notes', {  // Changed to '/api/notes'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(noteData),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setTitle('');
      setContent('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_NOTE', payload: json });  // Change 'CREATE_PHOTO' to 'CREATE_NOTE'
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Note</h3>

      <label>Note Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Content:</label>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes('content') ? 'error' : ''}
      ></textarea>

      <button>Add Note</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NoteForm;

