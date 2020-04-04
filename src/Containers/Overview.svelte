<script>
  import { onMount, onDestroy } from "svelte";
  import Card from "../Components/Card.svelte";
  import CountDisplay from "../Components/CountDisplay.svelte";
  import confirmedStore from "../store/confirmed.js";
  import deathsStore from "../store/deaths.js";
  import recoveredStore from "../store/recovered.js";

  let unSubscribeConfirmedStore;
  let unSubscribeDeathsStore;
  let unSubscribeRecoveredStore;
  let totalConfirmed = 0;
  let newConfirmed = 0;
  let totalDeaths = 0;
  let newDeaths = 0;
  let totalRecovered = 0;
  let newRecovered = 0;

  const getTotalAndNew = count => {
    const totalCount = count.length ? count[count.length - 1] : 0;
    return {
      totalCount,
      newCount:
        count.length > 1
          ? totalCount - count[count.length - 2] > -1
            ? totalCount - count[count.length - 2]
            : "--"
          : 0
    };
  };

  onMount(() => {
    unSubscribeConfirmedStore = confirmedStore.subscribe(({ count }) => {
      const data = getTotalAndNew(count);
      totalConfirmed = data.totalCount;
      newConfirmed = data.newCount;
    });

    unSubscribeDeathsStore = deathsStore.subscribe(({ count }) => {
      const data = getTotalAndNew(count);
      totalDeaths = data.totalCount;
      newDeaths = data.newCount;
    });

    unSubscribeRecoveredStore = recoveredStore.subscribe(({ count }) => {
      const data = getTotalAndNew(count);
      totalRecovered = data.totalCount;
      newRecovered = data.newCount;
    });
  });

  onDestroy(() => {
    if (unSubscribeConfirmedStore) {
      unSubscribeConfirmedStore();
    }

    if (unSubscribeDeathsStore) {
      unSubscribeDeathsStore();
    }

    if (unSubscribeRecoveredStore) {
      unSubscribeRecoveredStore();
    }
  });
</script>

<style>
  .overview {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
</style>

<div class="overview">
  <Card title="Confirmed">
    <CountDisplay
      colors={['#ffd079']}
      count={newConfirmed}
      total={totalConfirmed} />
  </Card>

  <Card title="Deaths">
    <CountDisplay
      colors={['rgb(241, 114, 114)']}
      count={newDeaths}
      total={totalDeaths} />
  </Card>

  <Card title="Recovered">
    <CountDisplay
      colors={['#8cd681']}
      count={newRecovered}
      total={totalRecovered} />
  </Card>
</div>
