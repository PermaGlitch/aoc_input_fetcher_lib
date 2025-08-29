# AoC automatic input fetcher

Fetch inputs for the select day and year from the AoC API by using the exposed function from `lib/inputGetter.js`:

```js
import { readInput } from "./lib/inputGetter.js";

(async () => {
    /*
        Fetches your input for the year 2024, day 1

        Built in caching system by putting the input string to a file
        on your system, and then returning directly from the file if
        it exists.
        Otherwise gets it fromt he API, returns it .trim()-ed, and writes
        it in a file.
    */
    const input = await readInput(2024, 1);
})();
```
