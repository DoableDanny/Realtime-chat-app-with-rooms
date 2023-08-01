interface DiffOptions {
    showLegend?: boolean;
}
/**
* Returns unified diff between two strings with coloured ANSI output.
*
* @private
* @param {String} actual
* @param {String} expected
* @return {string} The diff.
*/
declare function unifiedDiff(actual: unknown, expected: unknown, options?: DiffOptions): string;

export { DiffOptions, unifiedDiff };
