import { getFormattedTrickName } from "./utils";

describe("getFormattedTrickName", () => {
  it("returns the name with no whitespace if no alias is found", () => {
    const unformattedName = " truespin alleyoop  acid";

    expect(getFormattedTrickName(unformattedName)).toBe(
      "truespin alleyoop acid"
    );
  });

  it("replaces the unformatted name with the trick alias if found", () => {
    let unformattedName = "zerospin alleyoop sunnyday";
    expect(getFormattedTrickName(unformattedName)).toBe("zerospin pornstar");

    unformattedName = "topside mizou";
    expect(getFormattedTrickName(unformattedName)).toBe("sweatstance");

    unformattedName = "alleyoop topside mizou";
    expect(getFormattedTrickName(unformattedName)).toBe("kind grind");

    unformattedName = "alleyoop topside negative mizou";
    expect(getFormattedTrickName(unformattedName)).toBe("negative kind grind");

    unformattedName = "half cab topside makio";
    expect(getFormattedTrickName(unformattedName)).toBe("half cab fishbrain");

    unformattedName = "half cab topside negative makio";
    expect(getFormattedTrickName(unformattedName)).toBe(
      "half cab negative fishbrain"
    );

    unformattedName = "alleyoop negative sunnyday";
    expect(getFormattedTrickName(unformattedName)).toBe("negative pornstar");

    unformattedName = "alleyoop topside sunnyday";
    expect(getFormattedTrickName(unformattedName)).toBe("topside pornstar");

    unformattedName = "full cab alleyoop torque soul";
    expect(getFormattedTrickName(unformattedName)).toBe("full cab soyale");
  });
});
