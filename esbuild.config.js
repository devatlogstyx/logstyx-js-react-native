import esbuild from "esbuild";
import path from "path";

esbuild.build({
  entryPoints: [path.resolve(".", "src", "entry", "index.js")],
  outfile: "dist/logstyx-js-react-native.js",
  platform: "neutral", // for libraries targeting RN
  jsx: "automatic",
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ["es2015"],
  external: ['react', 'react-native'], // ← include react-native here
  loader: {
    '.js': 'jsx',
  },
  mainFields: ["module", "main"]
}).catch(() => process.exit(1));
