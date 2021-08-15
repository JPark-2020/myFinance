import { fire, db } from "../../util/firebase";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [note, setNote] = useState("");

  const ref = db.collection("reminders");

  function getReminders() {
    ref
      .where("author", "==", fire.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        console.log(items);
        setReminders(items);
      });
  }

  useEffect(() => {
    getReminders();
  }, []);

  function addReminder(reminder) {
    if (reminders.length > 2) {
      return;
    } else {
      ref
        .doc(reminder.id)
        .set(reminder)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function deleteReminder(reminder) {
    ref.doc(reminder.id).delete();
  }

  const reminderSubmitHandler = (event) => {
    event.preventDefault();

    addReminder({
      id: uuidv4(),
      author: fire.auth().currentUser.uid,
      notes: note,
    });
    setNote("");
  };

  return (
    <div>
      <h3>Reminders</h3>
      <div>
        <form onSubmit={reminderSubmitHandler}>
          <input
            type="text"
            value={note}
            placeholder="write a note..."
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit">+</button>
        </form>
      </div>
      {reminders.map((reminder) => {
        return (
          <div key={reminder.id}>
            <div>
              <p>{reminder.notes}</p>
            </div>
            <div>
              <button onClick={() => deleteReminder(reminder)}>X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reminders;
