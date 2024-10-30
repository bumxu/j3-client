import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess }  from 'svelte-preprocess';

const scssAliases = aliases => {
    return url => {
        for (const [alias, aliasPath] of Object.entries(aliases)) {
            if (url.indexOf(alias) === 0) {
                return {
                    file: url.replace(alias, aliasPath),
                };
            }
        }
        return url;
    };
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            scss: {
                importer: [
                    scssAliases({
                        '$scss': process.cwd() + '/src/scss',
                    }),
                ],
            },
            aliases: {
                $scss: './src/scss'
            }
        }),
    ],

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),

    },

    onwarn: (warning, handler) => {
        if (warning.code === 'a11y-click-events-have-key-events') return
        handler(warning)
    },
};

export default config;
