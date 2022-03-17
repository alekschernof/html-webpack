<template>
  <div>
    <div class="s-partners__nav">
      <div
        v-for="type in typePartners"
        :key="type[0]"
        :class="{
          's-partners__filter u-clickable':true ,
          's-partners__filter--active': activeFilter === type[0]
        }"
        @click="setActiveFilter(type[0])"
      >
        {{ dictFiler[type[0]] }} <b>{{ type[1] }}</b>
      </div>
    </div>
    <v-select
      v-model="activeFilter"
      label="label"
      :options="transformTypeForSelect(typePartners)"
      :reduce="transformVal"
      placeholder="Все партнеры"
    >
      <template #option="option">
        {{ option.label }}
      </template>
    </v-select>
    <div class="s-partners__introduction">
      Корпоративные партнеры выделяют дополнительные средства на консультации для своих сотрудников.
      Если вы являетесь сотрудником одной из этих компаний, укажите это в своей заявке.
    </div>
    <div class="s-partners__list">
      <div
        v-for="partner in filteredPartners"
        :key="partner.name"
        class="s-partners__item"
      >
        <img
          class="s-partners__item-img"
          :src="partner.img"
          alt=""
        >
        <div class="s-partners__item-info">
          <h5 class="s-partners__item-name">
            {{ partner.name }}
          </h5>
          <p class="s-partners__item-donat">
            {{ partner.donatCount }} ₽
          </p>
        </div>
      </div>
      <a
        v-if="!activeFilter"
        href="/html/contacts.html"
        class="s-partners__item add__partners"
      >
        <div class="oval-btn"></div>
        <h5><b>Стать нашим партнером</b></h5>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      partners: [
        {
          type: 'donors',
          name: 'BIOCAD',
          donatCount: '2 000 000',
          img: '../frontend/dist/img/partners/partners-1.png',
        },
        {
          type: 'corporate',
          name: 'OLYMPUS',
          donatCount: '250 000',
          img: '../frontend/dist/img/partners/partners-2.png',
        },
        {
          type: 'corporate',
          name: 'SIEMENS',
          donatCount: '1 990 000',
          img: '../frontend/dist/img/partners/partners-3.png',
        },
        {
          type: 'media',
          name: 'AVON',
          donatCount: '500 000',
          img: '../frontend/dist/img/partners/partners-9.png',
        },
        {
          type: 'infrastructure',
          name: 'GE HEALTHCARE',
          donatCount: '250 000',
          img: '../frontend/dist/img/partners/partners-4.png',
        },
        {
          type: 'media',
          name: 'NESTLE',
          donatCount: '1 500 000',
          img: '../frontend/dist/img/partners/partners-5.png',
        },
        {
          type: 'infrastructure',
          name: 'ЮНИКС',
          donatCount: '250 000',
          img: '../frontend/dist/img/partners/partners-7.png',
        },
        {
          type: 'corporate',
          name: 'BD',
          donatCount: '250 000',
          img: '../frontend/dist/img/partners/partners-8.png',
        },
        {
          type: 'corporate',
          name: 'ROCHE',
          donatCount: '2 000 000',
          img: '../frontend/dist/img/partners/partners-6.png',
        },
        {
          type: 'infrastructure',
          name: 'MSD',
          donatCount: '1 990 000',
          img: '../frontend/dist/img/partners/partners-10.png',
        },
      ],
      activeFilter: null,
      dictFiler: {
        donors: 'Доноры',
        corporate: 'Корпоративные партнёры',
        media: 'Информационные партнёры',
        infrastructure: 'Инфраструктурные партнёры',
      },
    };
  },
  computed: {
    filteredPartners() {
      if (!this.activeFilter) {
        return this.partners;
      }
      return this.partners.filter((part) => part.type === this.activeFilter);
    },
    // (тут магия) просто смотрим какие типы партнеров есть вообще
    typePartners() {
      const typePartner = this.partners.reduce((acc, { type }) => (
        acc[type] ? {
          ...acc,
          [type]: acc[type] + 1,
        } : {
          ...acc,
          [type]: 1,
        }),
      {});
      return Object.entries(typePartner);
    },
  },
  methods: {
    // задает активные фильтр
    setActiveFilter(filter) {
      if (filter === this.activeFilter) {
        this.activeFilter = null;
        return;
      }
      this.activeFilter = filter;
    },
    // это нужно для v-select
    transformTypeForSelect(arr) {
      return arr.map((item) => ({
        label: `${this.dictFiler[item[0]]} ${item[1]}`,
        filter: item[0],
      }));
    },
    // модифицируем option для передачи значения в activeFilter
    transformVal(option) {
      return option.filter;
    },
  },
};
</script>

<style lang="scss">
@import 'vue-select/src/scss/vue-select.scss';

$b: '.s-partners';

#{$b} {
  &__nav {
    width: 100%;
    border-bottom: 1px solid rgba(21, 24, 51, 0.12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: rem(24px);

    @include mobile {
      display: none;
    }
  }

  &__filter {
    background: #efeff4;
    border-radius: rem(20px);
    padding: rem(8px) rem(16px);

    @include text(rem(16px),1.5,$text-base);

    &:hover {
      background: $accent-base;
      color: $white-true;
    }

    &--active {
      background: $accent-base;
      color: $white-true;
    }
  }

  &__introduction {
    @include text(rem(16px),1.3,$text-base);
    text-align: center;
    max-width: rem(792px);
    margin: rem(31px) auto 0 auto;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: rem(-26px);
      width: rem(16px);
      height: rem(16px);
      border-radius: 50%;
      background: $yelow-color;
    }

    @include mobile {
      text-align: left;

      &::before {
        display: none;
      }
    }
  }

  &__list {
    padding-top: rem(68px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    @include mobile {
      justify-content: flex-start;

      & .add__partners {
        display: none;
      }
    }
  }

  &__item {
    max-width: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: rem(160px);
    justify-content: space-between;
    align-items: center;
    padding-top: rem(30px);
    margin-bottom: rem(45px);

    &-name {
      @include text(14px, 1.3, $text-base);
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    &-donat {
      @include text(14px, 1.4, $text-base);
    }

    &-img {
      max-width: rem(120px);
      height: auto;
    }

    @include mobile {
      max-width: 50%;
      height: rem(144px);
    }
  }

  &__item-info {
    text-align: center;
  }

  .v-select.vs--single {
    display: none;
  }

  .vs__search {
    &::placeholder {
      opacity: 0.5;
    }
  }

  .vs__dropdown-toggle {
    border: 1px solid $border-grey;
  }

  .vs__actions {
    transform: scale(0.8);
  }

  @include mobile {
    .v-select.vs--single {
      width: 100%;
      display: block !important;
    }
  }

  .vs__selected-options {
    @media screen and (max-width: 350px) {
      .vs__selected {
        font-size: 13px;
      }
    }
  }
}

.oval-btn {
  width: rem(72px);
  height: rem(72px);
  background-color: $shadow-base;
  position: relative;
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;
  margin-bottom: rem(20px);

  &::after {
    content: '';
    display: block;
    height: 2px;
    width: rem(40px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $white-true;
  }

  &::before {
    content: '';
    display: block;
    height: rem(40px);
    width: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $white-true;
  }

  &:hover {
    transform: rotateZ(180deg);
  }

  & + h5 {
    text-align: center;
    max-width: rem(144px);
  }
}

</style>
