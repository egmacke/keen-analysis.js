const demoTests = (demoConfig, Keen) => {
  const client = new Keen(demoConfig);

client.query({
  analysis_type: 'count',
  event_collection: 'purchases',
  timeframe: 'this_1_days'
})
.then(res => {
  console.log(res);
  // Handle response
})
.catch(err => {
  console.log(err);
  // Handle error
});

  return;

  const savedQueryName = 'my-saved-query-18jan-6';

  client
    .put(client.url('queries', 'saved', savedQueryName))
    .auth(client.masterKey())
    .send({
      query: {
        analysis_type: 'sum',
        target_property: 'price',
        event_collection: 'purchases',
        timeframe: 'this_6_months',
        filters: [
          {
            property_name: 'price',
            operator: 'gte',
            property_value: 0.50
          }
        ],
        group_by: [
          'platform'
        ],
        order_by: [
           {
             property_name: 'result',
             direction: 'ASC'
           }
        ],
        limit: 20
      },
      metadata: {
        display_name: savedQueryName,
      },
      refresh_rate: 14400
    })
    .then(res => {
      console.log(res);
      // Handle response
    })
    .catch(err => {
      console.log(err);
      // Handle error
    });



  let query = {
    analysis_type: 'count',
  //  target_property: 'user.id',
    event_collection: 'logins',

    timeframe: 'this_145_days',

    xtimeframe: {
      start: '2018-09-01T02:00:00.000Z',
      end: '2018-09-02T05:00:00.000Z'
    },

    include_metadata: true

/*
interval: 'hourly',
timezone: 'UTC'
*/

  };

  client
    .query({
      ...query
    }).then(res => {
      console.log(res);
    });


  return ;

  client
    .query({
      ...query,
      cache: {
        maxAge: 1000 * 60 * 60 * 3
      }
    }).then(res => {
      console.log('res from browser', res);
      localQuery && localQuery({
        //  file: 'dummy-data.csv',
          data: res,
          debug: true,
          ...query,

        //  timeframe: 'this_1_days',
          timeframe: {
            start: '2018-09-05T02:00:00.000Z',
            end: '2018-09-07T05:00:00.000Z'
          },

          onOutOfTimeframeRange: () => console.log('OUT OF TIME')
        }).then(res2 => {
          console.log(res.result, res2.result);
          if (JSON.stringify(res.result) === JSON.stringify(res2.result)){
            console.log('** OK');
          } else {
            console.log('!!! BAD');
            console.log(res,res2);

            let notFound = [];
            let notFound2 = [];
            res.result.forEach(item => {
              let found = res2.result.find(item2 => item2.keen.id === item.keen.id);
              if (!found) {
                notFound.push(item);
              }
            });
            res2.result.forEach(item => {
              let found = res.result.find(item2 => item2.keen.id === item.keen.id);
              if (!found) {
                notFound2.push(item);
              }
            });

            console.log('not found 1', notFound);
            console.log('not found 2', notFound2);

          }
        });

    });

return ;

  client
    .query({
      analysis_type: 'extraction',
      event_collection: 'pageviews',
      timeframe: 'this_30_days',
      cache: {
        maxAge: 1000 * 60 * 60 * 24
      }
    }).then(res => {
      console.log(res);

        client
          .localQuery({
            file: 'dummy-data.csv',
          //  data: [],
            debug: true,
          //  group_by: 'platform',

          analysis_type: 'count',
        //  timeframe: 'this_7_days'

/*
analysis_type: 'extraction',

filters: [
{
property_name: 'keen',
operator: 'exists',
property_value: true
}
],

timeframe: 'this_2_days',

interval: 'every_1_days'

           timeframe: {
             start: '2018-09-04T14:26:55.207Z',
             end: '2018-09-04T15:26:55.207Z'
           },

            order_by: {
              property_name: 'testing',
              direction: 'asc'
            },
            xlimit: 3
             */
          })
          .then(res => {
            console.log('res query', res);
          })
          .catch(err => {
            console.log(err);
          });


      return;


/*
      res.result = [
        { id: 0, user: 'a@ax33', testing: 33, keen: { timestamp: "2018-08-13T21:18:25.000Z" } },
        { id: 1, testing: 66, do: 'aaa', user: 'a@a', open: true, keen: { timestamp: "2018-08-31T01:18:25.000Z" }},
        { id: 2, testing: 5, do: {}, user: 'b@b', open: true, keen: { timestamp: "2018-08-24T00:18:20.000Z" }},
        { id: 3, testing: 4, do: null, user: 'a@a', open: false, keen: { timestamp: "2018-08-24T20:10:25.000Z" }},
        { id: 4, testing: 33, do: ['aa','bb','cc' , 2], user: 'b@b16', open: true, keen: { timestamp: "2018-08-30T21:18:25.000Z" }},
        { id: 5, testing: 2, user: 'a@a1', open: false, keen: { timestamp: "2018-08-31T01:18:25.000Z" }},
        { id: 6, testing: 11, do: 2, user: 'PLeeee@cccc', open: false, keen: { timestamp: "2018-08-31T12:39:17.000Z" }},
      ];
*/
    })
    .catch(er => console.log('er', er));

return;
  Keen.debug = true;
  client
    .query({
      analysis_type: 'count',
      event_collection: 'pageviews',
      timeframe: 'this_32_days',
      cache:{
        maxAge:4000
      }
    }).then(res=>console.log(res))
    .catch(er => console.log('er', er));

    client
      .query({
        analysis_type: 'count',
        event_collection: 'pageviews',
        timeframe: 'this_32_days'
      }).then(res=>console.log(res));

  const getPageviews = async () => {
    try {
      const result = await client
        .query({
          analysis_type: 'count',
          event_collection: 'pageviews',
          timeframe: 'this_31_days',
          cache: false
        });
      console.log('Await Result pageviews', result);
      return result;
    } catch (error) {
      console.error('Await Error pageviews', error);
    }
  }
  getPageviews();
  return;

  const newDatasetName = 'my-first-dataset2';

  client
    .query({
      dataset_name: newDatasetName,
      index_by: 'customer.id',
      timeframe: 'this_7_days'
    })
    .then(res => {
      console.log('get from dataset', res);
      // Handle results
    })
    .catch(err => {
      // Handle errors
      console.error('get from dataset err', err)
    });


  client
    .put({
      url: client.url('datasets', newDatasetName),
      api_key: client.config.masterKey,
      params: {
        display_name: 'Count Daily Product Purchases Over $100 by Country',
        query: {
          analysis_type: 'count',
          event_collection: 'purchases',
          filters: [
            {
              property_name: 'price',
              operator: 'gte',
              property_value: 100
            }
          ],
          group_by: 'ip_geo_info.country',
          interval: 'daily',
          timeframe: 'this_300_days'
        },
        index_by: 'product.id'
      }
    })
    .then(res => {
      console.log('create dataset res', res);
      // Handle response
    })
    .catch(err => {
        console.error('create dataset error res', err);
      // Handle error
    });

  client
    .query({
      saved_query_name: 'daily-pageviews-this-15-days'
    })
    .then(res => {
      // Handle results
      console.log('get saved q', res);
    })
    .catch(err => {
      // Handle errors
      console.error('get saved q err', err);
    });

  client
    .put({
      url: client.url('queries', 'saved', 'daily-pageviews-this-15-days'),
      api_key: client.config.masterKey,
      params: {
        refresh_rate: 60 * 60 * 4, // API will recalculate it every 4 hours [secs]
        query: {
          analysis_type: 'count',
          event_collection: 'pageviews',
          timeframe: 'this_16_days'
        },
        metadata: {
          display_name: 'Daily pageviews (this 14 days)',
          visualization: {
            chart_type: "metric"
          }
        }
      }
    })
    .then(res => {
      console.log('create saved res', res);
      // Handle results
    })
    .catch(err => {
      console.error('create saved err', err);
      // Handle errors
    });

  client
    .query({
      analysis_type: 'count',
      event_collection: 'pageviews',
      timeframe: 'this_15_days',
      cache: {
        maxAge: 10000
      }
    })
    .then(res => {
      client
        .query({
          analysis_type: 'count',
          event_collection: 'pageviews',
          timeframe: 'this_15_days',
          cache: {
            maxAge: 10000
          }
        }).then(res2 => {
          console.log('get to cache copy', res);
          console.log('got from cache', res2);
        });
        // Handle results
    })
    .catch(err => {
      console.error('err', err);
      // Handle errors
    });

    const qq11 = client.query('count', {
      event_collection: 'pageviews',
      timeframe: 'this_1_days'
    });

    const qq21 = new Keen.Query('count', {
      event_collection: 'pageviews',
      timeframe: 'this_30_days',
      timezone: 7200
    });

    const runs1 = client.run([qq11, qq21]);
    runs1.then(res => {
      console.log('client.runs', res);
    })
    .catch(err => {
      console.error('client.runs err', err);
    });

  const abortedQuery = client.query('count', {
      event_collection: 'pageviews',
      timeframe: 'this_100_days'
    });
  abortedQuery.abort();
  abortedQuery.then(res => {
    console.error('you shouldnt see this - query was aborted', res);
  })
  .catch(err => {
    console.error('you shouldnt see this - query was aborted err', err);
  });

  client
    .query('count', {
      event_collection: 'pageviews',
      timeframe: 'this_144_days'
    })
    .then(res => {
      console.log(res);
        // Handle results
    })
    .catch(err => {
      console.log('err', err);
      // Handle errors
    });

}

if (typeof window !== 'undefined') {
  window.demoTests = demoTests;
}
if (typeof global !== 'undefined') {
  module.exports = demoTests;
}
