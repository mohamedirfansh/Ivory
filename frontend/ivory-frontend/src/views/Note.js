import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { useState, useEffect } from "react";
import { Col, Container, Form, Row, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { USER_EMAIL } from "./constants";

const NOTES_ENDPOINT = "https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/notes";

const Note = (props) => {
    const [currentNote, setCurrentNote] = useState(EditorState.createEmpty());
    const [allNotes, setAllNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState("");
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
  );

    const getAllNotes = () => {
        let notes;
        return fetch(NOTES_ENDPOINT + "/all?" + new URLSearchParams({
            useremail: USER_EMAIL
        }), {
            mode: 'cors',
        }).then(response => response.json())
          .then(notes => {
            return notes.filter(x => x.endsWith(".json"));
           })
           .then(res => res.map(x => x.split('/').pop().split('.')[0]))
           .then(noteIds => {
                setAllNotes(noteIds);
                return noteIds;});
    }

    const initNotesList = () => {
        getAllNotes().then(_allNotes => true);
    }

    useEffect(() => {
        // initialise notes
        console.log("init");
        // initNotesList();
        const allNotesPromise = getAllNotes();

        allNotesPromise.then(listOfAllNotes => {
            const passedState = props.location.state;
            console.log(listOfAllNotes);
            console.log(passedState.id);
            if (passedState) {
                const id = passedState.id.split('.')[0];
                if (listOfAllNotes.includes(id)) {
                    console.log("includes");
                    setSelectedNote(id);
                    fetch(NOTES_ENDPOINT + "?" + new URLSearchParams({
                        useremail: USER_EMAIL, 
                        noteid: id + ".json"
                    }), {
                        mode: 'cors', 
                        'Content-Type': 'application/json'
                    }).then(response => response.json())
                       .then(res => {
                        console.log(res);
                        return res;
                       })
                       .then(data => {
                        console.log(data.data);
                        setCurrentNote(data.data);
                        const state = EditorState.createWithContent(convertFromRaw(JSON.parse(data.data)));
                        console.log(state);
                        setEditorState((prev) => state);
                       });
            
                    return;
                }
                const meetingId = passedState.meetingId;
                // create and publish new empty note
                console.log("NEW")
                setEditorState(EditorState.createEmpty());
                setSelectedNote(id);
                console.log(convertToRaw(editorState.getCurrentContent()));
                const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
                fetch(NOTES_ENDPOINT, {
                    method: 'POST', 
                    body: JSON.stringify({
                        noteid: id + ".json", 
                        email: USER_EMAIL, 
                        body: data
                    })
                }).then(res => {
                    if (res.status < 300) {
                        fetch("https://m4cbv166x2.execute-api.ap-southeast-1.amazonaws.com/prod/notes/meeting/", {
                            method: 'POST', 
                            body: JSON.stringify({
                                useremail: USER_EMAIL, 
                                noteid: id + ".json", 
                                meetingid: meetingId
                            })
                        })
                    }
                })
                .then(res => initNotesList());
                setSelectedNote(id);
            } else if (passedState && listOfAllNotes.includes(passedState.id)) {
                setSelectedNote(passedState.id);
            } else {}    
        });
    }, [setSelectedNote]);

    const selectNote = (selected) => {
        setSelectedNote(selected.target.value);
        console.log(selected.target.value);
        fetch(NOTES_ENDPOINT + "?" + new URLSearchParams({
            useremail: USER_EMAIL, 
            noteid: selected.target.value.toString() + ".json"
        }), {
            mode: 'cors', 
            'Content-Type': 'application/json'
        }).then(response => response.json())
           .then(res => {
            console.log(res);
            return res;
           })
           .then(data => {
            console.log(data.data);
            setCurrentNote(data.data);
            const state = EditorState.createWithContent(convertFromRaw(JSON.parse(data.data)));
            console.log(state);
            setEditorState((prev) => state);
           });
    }

    const deleteNote = (event) => {
        console.log(selectedNote);
        if (selectedNote != null) {
            fetch(NOTES_ENDPOINT + "?" + new URLSearchParams({
                useremail: USER_EMAIL, 
                noteid: selectedNote
            }), {
                method: "DELETE", 
                mode: 'cors', 
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (response.status < 300) {
                    console.log("deleted");
                    // success
                    setCurrentNote("");
                    setSelectedNote("");
                    initNotesList(setAllNotes);
                }
              });
        }
    }

    const publishNote = (event) => {
        event.preventDefault();
        console.log(selectedNote);
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        fetch(NOTES_ENDPOINT + "?" + new URLSearchParams({
            useremail: USER_EMAIL, 
            noteid: selectedNote
        }), {
            method: "DELETE", 
            mode: 'cors', 
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            fetch(NOTES_ENDPOINT, {
                method: 'POST', 
                body: JSON.stringify({
                    noteid: selectedNote + ".json", 
                    email: USER_EMAIL, 
                    body: data
                })
            }).then(res => console.log(res))
            .catch(e => console.log(e));
        });
        
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={8}>
                    <Form.Control as={"select"} aria-label="Selector for notes" onSelect={selectNote} onChange={selectNote} value={selectedNote}>
                        <option>
                            {""}
                        </option>
                        {
                            allNotes.map(noteId => (
                                <option key={noteId} value={noteId}>
                                    {noteId}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Col>
                <Col xs={2}>
                    <div style={{"visibility": selectedNote !== null}}>
                        <OverlayTrigger
                        overlay={
                            <Tooltip id="tooltip-488980961">
                            Save Note
                            </Tooltip>
                        }
                        >
                        <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="info"
                            onClick={publishNote}
                            disabled={!selectedNote}
                        >
                            <i className="fas fa-edit fa-lg"></i>
                        </Button>
                        </OverlayTrigger>
                    </div>
                </Col>
                <Col xs={2}>
                    <OverlayTrigger
                        overlay={
                            <Tooltip id="tooltip-488980961">
                            Delete Note
                            </Tooltip>
                        }
                        >
                        <Button
                            className="btn-simple btn-link p-1"
                            type="button"
                            variant="danger"
                            onClick={deleteNote}
                            disabled={!selectedNote}
                        >
                            <i className="fas fa-trash fa-lg"></i>
                        </Button>
                    </OverlayTrigger>

                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="pt-1 pb-1 pl-3 pr-3">
                        {/* <Editor editorState={EditorState.createWithContent(convertFromRaw(currentNote))}/> */}
                        <Editor editorState={editorState} onEditorStateChange={e => setEditorState(e)}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Note;