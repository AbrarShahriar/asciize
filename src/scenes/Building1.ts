import Scene from "../entities/Scene";
import Door from "../entities/statics/Door";
import Wall from "../entities/statics/Wall";
import { generateIdFor } from "../helper";
import { Rotation } from "../types.d";

const Building1 = new Scene({
  mapHeight: 10,
  mapWidth: 10,
  label: "Building1",
});
for (let y = 0; y < Building1.MAP_HEIGHT; y++) {
  Building1.staticEntities.set(`(${y},0)`, new Wall({ x: 0, y }));
  Building1.staticEntities.set(
    `(${y},${Building1.MAP_HEIGHT - 1})`,
    new Wall({ x: Building1.MAP_HEIGHT - 1, y })
  );
}
Building1.staticEntities.set(
  "(9,2)",
  new Door({
    x: 2,
    y: 9,
    destination: generateIdFor("City"),
    destinationCoords: { x: 9, y: 6 },
    rotation: Rotation.BOTTOM,
  })
);

export { Building1 };
