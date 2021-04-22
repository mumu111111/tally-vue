<template>
  <Layout>
    <header class="header">
      <div class="logo">
        <img :src="logo" alt="可乐记账" />
      </div>
      <div class="info">
        <div class="time">
          <select v-model="year" class="year">
            <option v-for="y in years" :key="y" :value="y">{{ y }}年</option>
          </select>
          <div class="month">
            <select v-model="month">
              <option v-for="m in 12" :key="m" :value="m">
                {{ beautifyMonth(m) }}
              </option>
            </select>
            <span>月</span>
          </div>
        </div>

        <div class="total">
          <div>
            <div class="label">收入</div>
            <div class="value">
              <span>{{ this.totalIncome.toString().split(".")[0] || 0 }}</span
              >.{{ this.totalIncome.toString().split(".")[1] || "00" }}
            </div>
          </div>
          <div>
            <div class="label">支出</div>
            <div class="value">
              <span>{{ this.totalExpense.toString().split(".")[0] || 0 }}</span
              >.{{ this.totalExpense.toString().split(".")[1] || "00" }}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </header>
    <ul class="record">
      <li v-for="(group, index) in list" :key="index">
        <div class="title">
          <span>{{ getTitle(group) }}</span>
          <span>{{ getTotal(group) }}</span>
        </div>

        <ul class="items">
          <li class="item" v-for="(item, index) in group.items" :key="index">
            <div class="tag">
              <Icon :name="item.tags.name" class="icon" />
              <span>{{ item.tags.value }}</span>
            </div>
            <span>{{ getAmount(item) }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
// import logo from '@/assets/logo.png';
import Icon from "@/components/Icon.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";

type Group = {
  name: string;
  items: RecordItem[];
};

@Component({
  components: { Icon, Layout },
})
export default class Bill extends Vue {
  // logo: string = logo;
  // 处理时间
  //   当前月份
  month = (dayjs().month() + 1).toString();
  year = dayjs().year().toString();

  get years() {
    const endYear = dayjs().year();
    let y = 1970;
    const result: number[] = [];
    while (y <= endYear) {
      result.push(y);
      y++;
    }
    return result;
  }
  //   localS或者store 中获取数据
  get recordList() {
    return this.$store.state.recordList;
  }
  //  当前月份的总支出和收入
  get xx() {
    let total = 0;
    // 当前月对应的数据 之中的 total
    return total;
  }
  beautifyMonth(m: number) {
    return m < 10 ? "0" + m.toString() : m.toString();
  }
  get list() {
    const results: Group[] = [];
    const names: string[] = [];
    // 获取当月的收入支出消费并且排序
    const list = clone<RecordItem[]>(this.recordList)
      .filter(
        (item) =>
          dayjs(item.createdAt).year() === parseInt(this.year) &&
          dayjs(item.createdAt).month() + 1 === parseInt(this.month)
      )
      .sort((b, a) => {
        return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
      });
    //  细分 对同一天的记录合并
    let record: RecordItem;
    for (record of list) {
      const date = dayjs(record.createdAt).toISOString().split("T")[0]; // 获取时间2021-2-2
      const index = names.indexOf(date);
      if (index < 0) {
        names.push(date);
        results.push({ name: date, items: [record] });
      } else {
        // 同一天的多条记录
        results[index].items.push(record);
      }
    }
    console.log("list", results);
    return results;
  }
  // 显示时间 eg昨天 星期
  getTitle(group: Group) {
    const day = dayjs(group.name);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return `今天 ${this.toWeekday(day.day())}`;
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return `昨天 ${this.toWeekday(day.day())}`;
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return `前天 ${this.toWeekday(day.day())}`;
    } else {
      return `${day.format("M月d日")} ${this.toWeekday(day.day())}`;
    }
  }
  // 总收入或支出金额
  getTotal(group: Group) {
    let total = 0;
    let item: RecordItem;
    for (item of group.items) {
      if (item.type === "-") {
        total -= item.amount;
      } else if (item.type === "+") {
        total += item.amount;
      }
    }
    if (total <= 0) {
      return `支出: ¥${Math.abs(total)}`;
    } else {
      return `收入: ¥${Math.abs(total)}`;
    }
  }
  //   支出加-   收入正常显示
  getAmount(record: RecordItem) {
    if (record.type === "+") {
      return record.amount;
    } else {
      return -record.amount;
    }
  }
  // 收入综合
  get totalIncome() {
    let total = 0;
    let group: Group;
    for (group of this.list) {
      let record: RecordItem;
      for (record of group.items) {
        if (record.type === "+") {
          total += record.amount;
        } else {
          continue;
        }
      }
    }
    return total;
  }
  // 支出综合
  get totalExpense() {
    let total = 0;
    let group: Group;
    for (group of this.list) {
      let record: RecordItem;
      for (record of group.items) {
        if (record.type === "-") {
          total += record.amount;
        } else {
          continue;
        }
      }
    }
    return total;
  }
  //   日期对应的星期几
  toWeekday(value: number) {
    if (value >= 0 && value <= 6) {
      return [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ][value];
    }
  }
}
</script>

<style lang="scss" scoped >
.header {
  background: #44c67e;
  text-align: center;
  .logo {
    img {
      height: 30px;
      vertical-align: top;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .info {
    display: flex;
    align-items: center;
    padding: 4px 0;
    .time {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      .year {
        font-size: 12px;
        padding: 0 3px;
        margin-bottom: 5px;
      }
      .month {
        font-size: 12px;
        padding: 0 3px;
        display: flex;
        align-items: center;
        select {
          font-size: 20px;
        }
      }
      ::after {
        content: "";
        display: block;
        width: 1px;
        height: 24px;
        background: #333;
        position: absolute;
        top: 50%;
        right: 0;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .label {
      font-size: 12px;
      margin-bottom: 4px;
    }
    .value {
      span {
        font-size: 20px;
      }
      font-size: 12px;
    }
    .calendar {
      position: relative;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::after {
        content: "";
        display: block;
        width: 1px;
        height: 24px;
        background: #333333;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
    .total {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      padding: 4px 16px;
    }
  }
}
.record {
  > li {
    .title {
      font-size: 12px;
      color: #999999;
      display: flex;
      justify-content: space-between;
      padding: 4px 16px;
      border-bottom: 1px solid #dddddd;
    }
    .items {
      display: flex;
      flex-direction: column;
      padding: 12px 16px;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        box-shadow: inset 0 -0.5px 0.5px -0.5px rgba(0, 0, 0, 0.2);
        .tag {
          display: flex;
          align-items: center;
          .icon {
            background: #f5f5f5;
            width: 30px;
            height: 30px;
            padding: 4px;
            border-radius: 50%;
            margin-right: 16px;
          }
        }
      }
    }
  }
}
</style>