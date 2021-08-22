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
      <h4 className="chart__header">Reminders</h4>
      <div>
        <form className='reminderForm' onSubmit={reminderSubmitHandler}>
          <input
            type="text"
            value={note}
            placeholder="write a note..."
            onChange={(e) => setNote(e.target.value)}
            className="reminderInput"
          />
          <button className="reminderSubmit" type="submit">
            +
          </button>
        </form>
      </div>
      {reminders.map((reminder) => {
        return (
          <div className="reminder__item" key={reminder.id}>
            
            <div className="reminder__content__container">
              <p className="reminder__content">{reminder.notes}</p>
              <button className="reminder__submit"
                onClick={() => deleteReminder(reminder)}
              >X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reminders;
