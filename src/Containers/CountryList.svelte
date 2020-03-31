<script>
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import Skeleton from "../Components/Skeleton.svelte";

  import countryStore from "../store/countries.js";
  import confirmedStore from "../store/confirmed.js";

  onMount(() => {
    countryStore.fetch();
  });

  const onCountryChange = async ({ detail: option }) => {
    countryStore.setSelected(option.value);
    confirmedStore.fetchData(option.value);
  };
</script>

<style>
  .country-switcher {
    --inputFontSize: 2rem;
    --height: 60px;
  }
</style>

<div class="select-box-theme country-switcher">
  <Skeleton isLoading={$countryStore.isLoading}>
    <Select
      items={$countryStore.countries}
      placeholder="Search Country here"
      on:select={onCountryChange}
      selectedValue={$countryStore.selected} />
  </Skeleton>
</div>
