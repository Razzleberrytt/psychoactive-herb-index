
const data = [
  { name: "Kratom", effects: "Stimulant/Sedative", region: "SE Asia" },
  { name: "Blue Lotus", effects: "Euphoric/Relaxant", region: "Egypt" },
  { name: "Kava", effects: "Calming", region: "Pacific Islands" }
];
let container = document.getElementById("herbTable");
container.innerHTML = "<ul>" + data.map(h => `<li><strong>${h.name}</strong>: ${h.effects} - ${h.region}</li>`).join("") + "</ul>";
