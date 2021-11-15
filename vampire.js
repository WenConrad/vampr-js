class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampire1 = this;
    let vampire2 = vampire;
    const getLineage = (lineageOf) => {
      let lineage = [lineageOf];
      while (lineageOf.creator) {
        lineageOf = lineageOf.creator;
        lineage.push(lineageOf);
      }
      return lineage;
    };
    let vamp1Lineage = getLineage(vampire1);
    let vamp2Lineage = getLineage(vampire2);
    for (let vamp of vamp1Lineage) {
      for (let vomp of vamp2Lineage) {
        if (vamp === vomp) {
          return vamp;
        }
      }
    }
  }
}

module.exports = Vampire;