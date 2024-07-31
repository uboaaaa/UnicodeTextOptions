/**
 * @name UnicodeTextOptions
 * @author uboaaaa
 * @description Adds options to convert your text to a variety of unicode styles. Syntax: /[command] "[text content]". Supported commands include /cursive, /gothic, /small (smallcaps), /sub (subscript), /sup (superscript), and /zalgo
 * @version 1.0.0
 */

module.exports = class UnicodeTextOptions {
  constructor() {
    this.textConverters = {
      //Available conversions
      cursive: this.toCursive,
      gothic: this.toGothic,
      small: this.toSmallCaps,
      sub: this.toSubScript,
      sup: this.toSuperScript,
      zalgo: this.toZalgo,
    };
  }

  start() {
    this.patch();
  }

  stop() {
    if (this.unpatch) this.unpatch();
  }

  patch() {
    // intercepts message to apply text conversion commands
    const MessageEvents = BdApi.Webpack.getModule(
      BdApi.Webpack.Filters.byProps("sendMessage"),
    );
    this.unpatch = BdApi.Patcher.before(
      "UnicodeTextOptions",
      MessageEvents,
      "sendMessage",
      (_, [channelId, message]) => {
        if (!message.content) return;

        const regex = /\/(\w+)\s+"([^"]+)"/g;
        let match;
        let newContent = message.content;

        while ((match = regex.exec(message.content)) !== null) {
          const [fullMatch, command, text] = match;
          if (this.textConverters[command]) {
            const convertedText = this.textConverters[command](text);
            newContent = newContent.replace(fullMatch, convertedText);
          }
        }

        message.content = newContent;
      },
    );
  }

  toEditableFormat(text) {}

  toCursive(text) {
    const cursiveMap = {
      A: "𝓐",
      B: "𝓑",
      C: "𝓒",
      D: "𝓓",
      E: "𝓔",
      F: "𝓕",
      G: "𝓖",
      H: "𝓗",
      I: "𝓘",
      J: "𝓙",
      K: "𝓚",
      L: "𝓛",
      M: "𝓜",
      N: "𝓝",
      O: "𝓞",
      P: "𝓟",
      Q: "𝓠",
      R: "𝓡",
      S: "𝓢",
      T: "𝓣",
      U: "𝓤",
      V: "𝓥",
      W: "𝓦",
      X: "𝓧",
      Y: "𝓨",
      Z: "𝓩",
      a: "𝓪",
      b: "𝓫",
      c: "𝓬",
      d: "𝓭",
      e: "𝓮",
      f: "𝓯",
      g: "𝓰",
      h: "𝓱",
      i: "𝓲",
      j: "𝓳",
      k: "𝓴",
      l: "𝓵",
      m: "𝓶",
      n: "𝓷",
      o: "𝓸",
      p: "𝓹",
      q: "𝓺",
      r: "𝓻",
      s: "𝓼",
      t: "𝓽",
      u: "𝓾",
      v: "𝓿",
      w: "𝔀",
      x: "𝔁",
      y: "𝔂",
      z: "𝔃",
    };
    return text
      .split("")
      .map((char) => cursiveMap[char] || char)
      .join("");
  }

  toGothic(text) {
    const gothicMap = {
      a: "𝔞",
      b: "𝔟",
      c: "𝔠",
      d: "𝔡",
      e: "𝔢",
      f: "𝔣",
      g: "𝔤",
      h: "𝔥",
      i: "𝔦",
      j: "𝔧",
      k: "𝔨",
      l: "𝔩",
      m: "𝔪",
      n: "𝔫",
      o: "𝔬",
      p: "𝔭",
      q: "𝔮",
      r: "𝔯",
      s: "𝔰",
      t: "𝔱",
      u: "𝔲",
      v: "𝔳",
      w: "𝔴",
      x: "𝔵",
      y: "𝔶",
      z: "𝔷",
      A: "𝔄",
      B: "𝔅",
      C: "ℭ",
      D: "𝔇",
      E: "𝔈",
      F: "𝔉",
      G: "𝔊",
      H: "ℌ",
      I: "ℑ",
      J: "𝔍",
      K: "𝔎",
      L: "𝔏",
      M: "𝔐",
      N: "𝔑",
      O: "𝔒",
      P: "𝔓",
      Q: "𝔔",
      R: "ℜ",
      S: "𝔖",
      T: "𝔗",
      U: "𝔘",
      V: "𝔙",
      W: "𝔚",
      X: "𝔛",
      Y: "𝔜",
      Z: "ℨ",
    };
    return text
      .split("")
      .map((char) => gothicMap[char] || char)
      .join("");
  }

  toSmallCaps(text) {
    const smallCapsMap = {
      a: "ᴀ",
      b: "ʙ",
      c: "ᴄ",
      d: "ᴅ",
      e: "ᴇ",
      f: "ꜰ",
      g: "ɢ",
      h: "ʜ",
      i: "ɪ",
      j: "ᴊ",
      k: "ᴋ",
      l: "ʟ",
      m: "ᴍ",
      n: "ɴ",
      o: "ᴏ",
      p: "ᴘ",
      q: "ǫ",
      r: "ʀ",
      s: "s",
      t: "ᴛ",
      u: "ᴜ",
      v: "ᴠ",
      w: "ᴡ",
      x: "x",
      y: "ʏ",
      z: "ᴢ",
    };
    return text
      .toLowerCase()
      .split("")
      .map((char) => smallCapsMap[char] || char)
      .join("");
  }

  toSubScript(text) {
    const subScriptMap = {
      a: "ₐ",
      b: "ᵦ",
      c: "𝒸",
      d: "ᑯ",
      e: "ₑ",
      f: "ꜰ",
      g: "ɢ",
      h: "ₕ",
      i: "ᵢ",
      j: "ⱼ",
      k: "ₖ",
      l: "ₗ",
      m: "ₘ",
      n: "ₙ",
      o: "ₒ",
      p: "ₚ",
      q: "ᵩ",
      r: "ᵣ",
      s: "ₛ",
      t: "ₜ",
      u: "ᵤ",
      v: "ᵥ",
      w: "ᴡ",
      x: "ₓ",
      y: "ᵧ",
      z: "ᴢ",
      0: "₀",
      1: "₁",
      2: "₂",
      3: "₃",
      4: "₄",
      5: "₅",
      6: "₆",
      7: "₇",
      8: "₈",
      9: "₉",
    };
    return text
      .toLowerCase()
      .split("")
      .map((char) => subScriptMap[char] || char)
      .join("");
  }

  toSuperScript(text) {
    const superScriptMap = {
      A: "ᴬ",
      B: "ᴮ",
      C: "ᶜ",
      D: "ᴰ",
      E: "ᴱ",
      F: "ᶠ",
      G: "ᴳ",
      H: "ᴴ",
      I: "ᴵ",
      J: "ᴶ",
      K: "ᴷ",
      L: "ᴸ",
      M: "ᴹ",
      N: "ᴺ",
      O: "ᴼ",
      P: "ᴾ",
      Q: "ᵠ",
      R: "ᴿ",
      S: "ˢ",
      T: "ᵀ",
      U: "ᵁ",
      V: "ⱽ",
      W: "ᵂ",
      X: "ˣ",
      Y: "ʸ",
      Z: "ᶻ",
      a: "ᵃ",
      b: "ᵇ",
      c: "ᶜ",
      d: "ᵈ",
      e: "ᵉ",
      f: "ᶠ",
      g: "ᵍ",
      h: "ʰ",
      i: "ᶦ",
      j: "ʲ",
      k: "ᵏ",
      l: "ˡ",
      m: "ᵐ",
      n: "ⁿ",
      o: "ᵒ",
      p: "ᵖ",
      q: "ᵠ",
      r: "ʳ",
      s: "ˢ",
      t: "ᵗ",
      u: "ᵘ",
      v: "ᵛ",
      w: "ʷ",
      x: "ˣ",
      y: "ʸ",
      z: "ᶻ",
      0: "⁰",
      1: "¹",
      2: "²",
      3: "³",
      4: "⁴",
      5: "⁵",
      6: "⁶",
      7: "⁷",
      8: "⁸",
      9: "⁹",
    };
    return text
      .split("")
      .map((char) => superScriptMap[char] || char)
      .join("");
  }

  toZalgo(text) {
    const zalgoMarks = [
      "\u0300",
      "\u0301",
      "\u0302",
      "\u0303",
      "\u0304",
      "\u0305",
      "\u0306",
      "\u0307",
      "\u0308",
      "\u0309",
      "\u030A",
      "\u030B",
      "\u030C",
      "\u030D",
      "\u030E",
      "\u030F",
      "\u0310",
      "\u0311",
      "\u0312",
      "\u0313",
      "\u0314",
      "\u0315",
      "\u0316",
      "\u0317",
      "\u0318",
      "\u0319",
      "\u031A",
      "\u031B",
      "\u031C",
      "\u031D",
      "\u031E",
      "\u031F",
      "\u0320",
      "\u0321",
      "\u0322",
      "\u0323",
      "\u0324",
      "\u0325",
      "\u0326",
      "\u0327",
      "\u0328",
      "\u0329",
      "\u032A",
      "\u032B",
      "\u032C",
      "\u032D",
      "\u032E",
      "\u032F",
      "\u0330",
      "\u0331",
      "\u0332",
      "\u0333",
      "\u0334",
      "\u0335",
      "\u0336",
      "\u0337",
      "\u0338",
      "\u0339",
      "\u033A",
      "\u033B",
      "\u033C",
      "\u033D",
      "\u033E",
      "\u033F",
      "\u0340",
      "\u0341",
      "\u0342",
      "\u0343",
      "\u0344",
      "\u0345",
      "\u0346",
      "\u0347",
      "\u0348",
      "\u0349",
      "\u034A",
      "\u034B",
      "\u034C",
      "\u034D",
      "\u034E",
      "\u0350",
      "\u0351",
      "\u0352",
      "\u0353",
      "\u0354",
      "\u0355",
      "\u0356",
      "\u0357",
      "\u0358",
      "\u0359",
      "\u035A",
      "\u035B",
      "\u035C",
      "\u035D",
      "\u035E",
      "\u035F",
      "\u0360",
      "\u0361",
      "\u0362",
      "\u0363",
      "\u0364",
      "\u0365",
      "\u0366",
      "\u0367",
      "\u0368",
      "\u0369",
      "\u036A",
      "\u036B",
      "\u036C",
      "\u036D",
      "\u036E",
      "\u036F",
    ];

    return text
      .split("")
      .map((char) => {
        return (
          char +
          Array.from(
            zalgoMarks[Math.floor(Math.random() * zalgoMarks.length)],
          ).join("")
        );
      })
      .join("");
  }
};
