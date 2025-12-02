import { isAddress } from 'ethers';

const WORD_LISTS = {
    prefix: [
        "sleepy", "lazy", "tiny", "soft", "silly", "nerdy", "baby", "mini",
        "crypto", "gas", "chain", "block", "ai", "robo", "mecha", "quant",
        "noisy", "vibey", "weird", "spicy", "dusty", "fuzzy", "cosmic", "awkward",
        "chill", "midnight", "sunny", "pixel", "error", "glitchy", "broken", "lost",
        "cute", "fluffy", "happy", "moody", "snacky", "lofi", "hyper", "warm",
        "dreamy", "sneaky", "ghosty", "sparkly", "neon", "minty", "fresh",
        "alpha", "beta", "gamma", "eth", "sol", "zk", "modular", "sassy", "cranky", "dainty"
    ],
    core: [
        "panda", "otter", "fox", "koala", "bunny", "cat", "doggo", "raccoon", "mole",
        "penguin", "seal", "turtle", "hamster", "hedgehog", "mouse", "whale",
        "dolphin", "sharky", "dragon", "unicorn", "degen", "coder", "builder",
        "dev", "anon", "validator", "indexer", "signer", "dreamer", "runner",
        "wanderer", "lurker", "observer", "agent", "bot", "robot", "protocol",
        "module", "kernel", "wizard", "witch", "goblin", "sprite", "gremlin", "ghost",
        "alien", "pilot", "driver", "gazer", "nerd", "noodle", "vibes", "monkey",
        "ape", "kitten", "cub", "ferret", "pupper", "chick", "sparrow", "falcon", "bee",
        "otaku", "gremlin", "critter"
    ],
    suffix: [
        ".eth", ".sol", ".ai", ".exe", ".zip", ".js", ".py",
        "_dev", "_xyz", "_lol", "owo", "uwu",
        "420", "777", "9000", "0x", "v2", "v3",
        "plus", "minus", "chan", "kun", "san", "bot",
        "mode", "core", "deluxe", "beta", "alpha"
    ]
};

// Simple seeded random number generator (same as in AvatarGenerator for consistency)
const seededRandom = (seed) => {
    let value = seed;
    return () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
};

const addressToSeed = (address) => {
    if (!address) return 0;
    const cleanAddr = address.toLowerCase().replace('0x', '');
    // Use a different slice or offset to ensure nickname doesn't perfectly correlate with visual features if desired,
    // but using the same seed source is fine for determinism.
    return parseInt(cleanAddr.slice(8, 16), 16); // Using a different slice than avatar (0-8) for variety
};

export const generateNickname = (address) => {
    if (!isAddress(address)) return null;

    const seed = addressToSeed(address);
    const random = seededRandom(seed);

    const prefixIndex = Math.floor(random() * WORD_LISTS.prefix.length);
    const coreIndex = Math.floor(random() * WORD_LISTS.core.length);
    const suffixIndex = Math.floor(random() * WORD_LISTS.suffix.length);

    const prefix = WORD_LISTS.prefix[prefixIndex];
    const core = WORD_LISTS.core[coreIndex];
    const suffix = WORD_LISTS.suffix[suffixIndex];

    return `${prefix}-${core}${suffix}`;
};
