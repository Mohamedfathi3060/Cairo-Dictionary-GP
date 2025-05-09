const express = require('express');
const router = express.Router();
const client = require('../Services/elasticsearch');

// router.get('/', async (req, res) => {
//   const page = req.query.page || 1;
//   const size = req.query.per_page || 20;
//   const from = (page - 1) * size;

//   try {
//     const response = await client.search({
//       index: 'test_def_ara',
//       from,
//       size,
//       query: {
//         match: {
//           input: req.query.word,
//         },
//       },
//     });

//     res.json({
//       total_count: response.hits.total.value,
//       page_count: response.hits.hits.length,
//       data: response.hits.hits,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error searching documents');
//   }
// });

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.per_page) || 20;
  const from = (page - 1) * size;
  const word = req.query.word;

  try {
    const response = await client.search({
      index: 'context_search',
      from,
      size,
      query: {
        match: {
          context: word,
        },
      },
      highlight: {
        pre_tags: ['$'],
        post_tags: ['$'],
        fields: {
          context: {
            fragment_size: 500,
            number_of_fragments: 1,
            fragment_offset: 0,
            no_match_size: 150,
          },
        },
      },
    });

    const results = response.hits.hits.map((hit) => ({
      ...hit._source,
      highlight: hit.highlight?.context || [],
    }));

    res.json({
      total_count: response.hits.total.value,
      page_count: response.hits.hits.length,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching documents');
  }
});

module.exports = router;
