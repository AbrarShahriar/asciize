import Scene from "../entities/Scene";
import Door from "../entities/statics/Door";
import Wall from "../entities/statics/Wall";
import { generateIdFor } from "../helper";
import { Rotation } from "../types.d";

const City = new Scene({
  mapHeight: 20,
  mapWidth: 20,
  label: "City",
});
for (let y = 2; y < 2 + 4; y++) {
  for (let x = 5; x < 5 + 9; x++) {
    City.staticEntities.set(`(${y},${x})`, new Wall({ x, y }));
  }
}
for (let y = 9; y < 9 + 4; y++) {
  for (let x = 5; x < 5 + 9; x++) {
    City.staticEntities.set(`(${y},${x})`, new Wall({ x, y }));
  }
}
City.staticEntities.set(
  "(5,9)",
  new Door({
    x: 5,
    y: 9,
    destination: generateIdFor("Building1"),
    destinationCoords: { x: 2, y: 8 },
    rotation: Rotation.TOP,
  })
);
City.staticEntities.set(
  "(9,9)",
  new Door({
    x: 9,
    y: 9,
    destination: generateIdFor("Building2"),
    destinationCoords: { x: 2, y: 1 },
    rotation: Rotation.BOTTOM,
  })
);

export { City };
