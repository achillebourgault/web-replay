const path = require('path');

exports.onPostBuild = ({ reporter }) => {
    reporter.info(`Your Gatsby site has been built!`)
}

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    createPage({
        path: '/replays/1',
        component: path.resolve(`src/templates/replay/replay.js`),

        // Send additional data to page component
        context: {
            id: 'hello-world',
        },
    });
};
