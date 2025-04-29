import Scene from "../entities/Scene";
import Door from "../entities/statics/Door";
import Wall from "../entities/statics/Wall";
import { generateIdFor } from "../helper";
import { Rotation } from "../types.d";

const Building2 = new Scene({
  mapHeight: 10,
  mapWidth: 10,
  label: "Building2",
});
for (let x = 0; x < Building2.MAP_WIDTH; x++) {
  Building2.staticEntities.set(`(0,${x})`, new Wall({ x, y: 0 }));
  Building2.staticEntities.set(
    `(${x},${Building2.MAP_WIDTH - 1})`,
    new Wall({ y: Building2.MAP_WIDTH - 1, x })
  );
}
Building2.staticEntities.set(
  "(0,2)",
  new Door({
    x: 2,
    y: 0,
    destination: generateIdFor("City"),
    destinationCoords: { x: 9, y: 8 },
    rotation: Rotation.TOP,
  })
);

export { Building2 };
