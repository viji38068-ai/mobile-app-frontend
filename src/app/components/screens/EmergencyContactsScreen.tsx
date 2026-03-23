import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, Phone, Edit2, Trash2, X, Check } from "lucide-react";

const initialContacts = [
  { id: 1, name: "Mom (Sunita Sharma)", relation: "Mother", number: "+91 98765 43210", avatar: "👩‍🦳", isPrimary: true },
  { id: 2, name: "Anjali Singh", relation: "Best Friend", number: "+91 87654 32109", avatar: "👩", isPrimary: false },
  { id: 3, name: "Dr. Meena Kumar", relation: "Doctor", number: "+91 76543 21098", avatar: "👩‍⚕️", isPrimary: false },
];

export function EmergencyContactsScreen() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(initialContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAdd = () => {
    if (!newName || !newNumber) return;
    setContacts([...contacts, {
      id: Date.now(), name: newName, relation: newRelation,
      number: newNumber, avatar: "👤", isPrimary: false
    }]);
    setNewName(""); setNewRelation(""); setNewNumber("");
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="h-full w-full flex flex-col" style={{ background: "#FFF0F5" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex-shrink-0 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #9C27B0, #6A1B9A)" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowLeft size={18} color="white" />
          </button>
          <div>
            <h1 className="text-white" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Emergency Contacts</h1>
            <p className="text-white/70" style={{ fontSize: "0.72rem" }}>Manage your safety network</p>
          </div>
        </div>
        <button onClick={() => setShowAddForm(true)}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <Plus size={18} color="white" />
        </button>
      </div>

      {/* Quick Helplines */}
      <div className="mx-4 mt-4 bg-purple-50 rounded-2xl p-3 flex items-center gap-2"
        style={{ border: "1px solid #E1BEE7" }}>
        <span style={{ fontSize: "1.2rem" }}>🚨</span>
        <div className="flex-1">
          <p className="text-purple-700" style={{ fontSize: "0.8rem", fontWeight: 700 }}>National Emergency Helplines</p>
          <div className="flex gap-3 mt-1">
            {[{ label: "Police", number: "100" }, { label: "Women", number: "1091" }, { label: "Ambulance", number: "108" }].map((h) => (
              <div key={h.label} className="flex items-center gap-1">
                <span className="text-purple-500" style={{ fontSize: "0.7rem" }}>{h.label}:</span>
                <span className="text-purple-700" style={{ fontSize: "0.75rem", fontWeight: 700 }}>{h.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-gray-400 mb-3" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
          MY CONTACTS ({contacts.length}/5)
        </p>
        <div className="flex flex-col gap-3">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-4 shadow-sm"
              style={{ border: contact.isPrimary ? "1.5px solid #CE93D8" : "1px solid #F3E5F5" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#F3E5F5" }}>
                  <span style={{ fontSize: "1.5rem" }}>{contact.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[#1A1A2E]" style={{ fontSize: "0.88rem", fontWeight: 700 }}>{contact.name}</p>
                    {contact.isPrimary && (
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>{contact.relation}</p>
                  <p className="text-purple-600" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{contact.number}</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <Phone size={14} color="#9C27B0" />
                  </button>
                  <button
                    onClick={() => setDeleteId(deleteId === contact.id ? null : contact.id)}
                    className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <Trash2 size={14} color="#F44336" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {deleteId === contact.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 flex items-center justify-between"
                      style={{ borderTop: "1px solid #FFF0F5" }}>
                      <p className="text-red-500" style={{ fontSize: "0.78rem" }}>Remove this contact?</p>
                      <div className="flex gap-2">
                        <button onClick={() => setDeleteId(null)}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-600"
                          style={{ fontSize: "0.75rem" }}>Cancel</button>
                        <button onClick={() => handleDelete(contact.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-500 text-white"
                          style={{ fontSize: "0.75rem" }}>Remove</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Add Contact Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAddForm(true)}
          className="w-full mt-4 py-3.5 rounded-2xl flex items-center justify-center gap-2"
          style={{ border: "2px dashed #CE93D8", color: "#9C27B0", fontSize: "0.9rem", fontWeight: 600, background: "transparent" }}
        >
          <Plus size={18} /> Add Emergency Contact
        </motion.button>
      </div>

      {/* Add Contact Modal */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-10"
              onClick={() => setShowAddForm(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-20 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1A1A2E]" style={{ fontSize: "1rem", fontWeight: 700 }}>Add Emergency Contact</h3>
                <button onClick={() => setShowAddForm(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X size={16} color="#666" />
                </button>
              </div>
              {[
                { label: "Full Name", value: newName, setter: setNewName, placeholder: "e.g. Priya's Mom", type: "text" },
                { label: "Relationship", value: newRelation, setter: setNewRelation, placeholder: "e.g. Mother, Friend", type: "text" },
                { label: "Phone Number", value: newNumber, setter: setNewNumber, placeholder: "+91 XXXXX XXXXX", type: "tel" },
              ].map((field) => (
                <div key={field.label} className="mb-3">
                  <label className="text-purple-700 mb-1.5 block" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full bg-purple-50 rounded-xl px-4 py-3 outline-none text-[#1A1A2E] placeholder-gray-400"
                    style={{ border: "1.5px solid #E1BEE7", fontSize: "0.88rem" }}
                  />
                </div>
              ))}
              <button
                onClick={handleAdd}
                className="w-full py-3.5 rounded-2xl text-white mt-2"
                style={{ background: "linear-gradient(135deg, #9C27B0, #6A1B9A)", fontSize: "0.95rem", fontWeight: 700 }}
              >
                Add Contact ✓
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
