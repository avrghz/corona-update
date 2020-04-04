<script>
  import Select from "svelte-select";
  import Skeleton from "../Components/Skeleton.svelte";

  import countryStore from "../store/countries.js";
  import confirmedStore from "../store/confirmed.js";
  import deathsStore from "../store/deaths.js";
  import recoveredStore from "../store/recovered.js";

  const onCountryChange = async ({ detail: option }) => {
    countryStore.setSelected(option);
    confirmedStore.fetchData(option.id);
    deathsStore.fetchData(option.id);
    recoveredStore.fetchData(option.id);
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
