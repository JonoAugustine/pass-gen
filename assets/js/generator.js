/** Characters to source from for password generation. */
const char = {
  alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  special: "`~!@#$%^&*()_+-=[]{}\\|;:'\"/?<>.,"
};

/** Inclusive integer range for allowed password lengths. */
const range = { min: 8, max: 128 };

/**
 * Checks if an integer is within the allowed range.
 * @param {*} int The integer to check.
 * @returns `true` if the given int is within the allowed range
 */
const inRange = int => int >= range.min && int <= range.max;

/**
 * Generates a pseudo-random integer from 0 until the given bound.
 * @param {Number} upperBound The exclusive upper-bound of the random number range.
 * @returns a pseudo-random integer from 0 until the given bound.
 */
const random = upperBound => Math.floor(Math.random() * upperBound);

/**
 * Create a new password with the given specifications.
 * @param {boolean} lower Whether to use lower-case letters.
 * @param {boolean} upper Whether to use upper-case letters.
 * @param {boolean} num Whether to use digits.
 * @param {boolean} spec Whether to use special characters.
 * @param {Number} leng The length of the password.
 * @returns The generated password if at least one character type is selected
 * and the length is within range. `-1` if no character type is
 * selected. `-2` if the length is not in range.
 */
const newPassword = (lower, upper, num, spec, leng) => {
  // Ensure at least 1 type selected
  if (!(lower || upper || num || spec)) return -1;
  // Ensure length in range
  if (!inRange(leng)) return -2;

  // Build source string
  const src =
    (lower ? char.alpha.toLowerCase() : "") +
    (upper ? char.alpha : "") +
    (num ? char.number : "") +
    (spec ? char.special : "");
  // Build password
  let out = "";
  for (var i = 0; i < leng; i++) {
    out += src[random(src.length)];
  }
  return out;
};

/** The text input destination */
const input_box = document.getElementById("dest");

/**
 * Retrives user-input through confirms & prompts, then attempts to generate a
 * new password from the given spec. On success, the new password will be shown
 * in the input_box. On failure, the respective err will be shown in an alert.
 */
const gen = () => {
  const pass = newPassword(
    confirm("Use lowercase letters?"),
    confirm("Use uppercase letters?"),
    confirm("Use numbers?"),
    confirm(`Use special characters? (${char.special})`),
    prompt(`Password Length (${range.min} to ${range.max} inclusive)`)
  );
  switch (pass) {
    case -2:
      alert(
        `Password length must be between ${range.min} and ${range.max}(inclusive)`
      );
      break;
    case -1:
      alert("At least 1 character type must be selected.");
      break;
    default:
      input_box.value = pass;
      break;
  }
};

/**
 * Copy password to clipboard
 */
const copy = () => {
  if (input_box.value == "") return;
  input_box.focus();
  input_box.select();

  try {
    if (document.execCommand("copy")) alert("Copied to clipboard");
    else alert("Failed to copy");
  } catch (err) {
    alert("Failed to copy");
  }
};
