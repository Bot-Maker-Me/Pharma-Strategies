export { SplitText } from './split-text';
export { ShinyText } from './shiny-text';
export { StarBorder } from './star-border';
export { Squares } from './squares';
export { ClickSpark } from './click-spark';
export { Magnet } from './magnet';
// Silk is intentionally NOT re-exported here: it must be lazily imported from
// './silk' (default export) so the OGL/WebGL bundle stays out of the main chunk.
