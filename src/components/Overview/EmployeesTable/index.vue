<template>
  <div class="employees-info">
    <div class="container">
      <h2 class="row__title">Employees</h2>
      <table class="table">
        <thead class="table__thead">
          <tr>
            <th class="table__th">
              <input id="selectAll" type="checkbox" class="table__select-row" />
            </th>
            <th class="table__th">Name</th>
            <th class="table__th">Policy</th>
            <th class="table__th">Policy status</th>
            <th class="table__th">Destination</th>
            <th class="table__th">Status</th>
            <th class="table__th">Progress</th>
            <th class="table__th"></th>
          </tr>
        </thead>
        <tbody class="table__tbody">
          <tr class="table-row table-row--chris">
            <td class="table-row__td">
              <input id="" type="checkbox" class="table__select-row" />
            </td>
            <td class="table-row__td">
              <div class="table-row__img"></div>
              <div class="table-row__info">
                <p class="table-row__name">Christin Ericssen</p>
                <span class="table-row__small">CFO</span>
              </div>
            </td>
            <td data-column="Policy" class="table-row__td">
              <div class="">
                <p class="table-row__policy">$5,000</p>
                <span class="table-row__small">Basic Policy</span>
              </div>
            </td>
            <td data-column="Policy status" class="table-row__td">
              <p class="table-row__p-status status--green status">Approved</p>
            </td>
            <td data-column="Destination" class="table-row__td">Huston, US</td>
            <td data-column="Status" class="table-row__td">
              <p class="table-row__status status--green status">Active</p>
            </td>
            <td data-column="Progress" class="table-row__td">
              <p class="table-row__progress status--blue status">On Track</p>
            </td>
            <td class="table-row__td"></td>
          </tr>
          <tr class="table-row table-row--angie">
            <td class="table-row__td">
              <input id="" type="checkbox" class="table__select-row" />
            </td>
            <td class="table-row__td">
              <div class="table-row__img"></div>
              <div class="table-row__info">
                <p class="table-row__name">Angie E. Swift</p>
                <span class="table-row__small">Vp of Sales</span>
              </div>
            </td>
            <td data-column="Policy" class="table-row__td">
              <div class="">
                <p class="table-row__policy">$20,000</p>
                <span class="table-row__small">All Inclusive Policy</span>
              </div>
            </td>
            <td data-column="Policy Status" class="table-row__td">
              <p class="table-row__p-status status status--yellow">
                Awating Approval
              </p>
            </td>
            <td data-column="Destination" class="table-row__td">Huston, US</td>
            <td data-column="Status" class="table-row__td">
              <p class="table-row__status">Waiting</p>
            </td>
            <td data-column="Progress" class="table-row__td">
              <p class="table-row__progress">Waiting</p>
            </td>
            <td class="table-row__td"></td>
          </tr>

          <tr class="table-row table-row--ronald">
            <td class="table-row__td">
              <input id="" type="checkbox" class="table__select-row" />
            </td>
            <td class="table-row__td">
              <div class="table-row__img"></div>
              <div class="table-row__info">
                <p class="table-row__name">Ronals Koeman</p>
                <span class="table-row__small">Advisory board</span>
              </div>
            </td>
            <td class="table-row__td">
              <div data-column="Policy" class="">
                <p class="table-row__policy">$5,000</p>
                <span class="table-row__small">Basic Policy</span>
              </div>
            </td>
            <td data-column="Policy status" class="table-row__td">
              <p class="table-row__p-status status--green status">Approved</p>
            </td>
            <td data-column="destination" class="table-row__td">Huston, US</td>
            <td data-column="status" class="table-row__td">
              <p class="table-row__status">Canceled</p>
            </td>
            <td data-column="pregress" class="table-row__td">
              <p class="table-row__progress status--blue status">Canceled</p>
            </td>
            <td class="table-row__td"></td>
          </tr>

          <tr class="table-row table-row--june table-row--red">
            <td class="table-row__td">
              <div class="table-row--overdue"></div>
              <input id="" type="checkbox" class="table__select-row" />
            </td>
            <td class="table-row__td">
              <div class="table-row__img"></div>
              <div class="table-row__info">
                <p class="table-row__name">June Simmons</p>
                <span class="table-row__small">Social content manager</span>
              </div>
            </td>
            <td data-column="Policy" class="table-row__td">
              <div class="">
                <p class="table-row__policy">$5,000</p>
                <span class="table-row__small">Basic Policy</span>
              </div>
            </td>
            <td data-column="Policy status" class="table-row__td">
              <p class="table-row__p-status status--red status">Rejected</p>
            </td>
            <td data-column="destination" class="table-row__td">Huston, US</td>
            <td data-column="status" class="table-row__td">
              <p class="table-row__status">Rejected</p>
            </td>
            <td data-column="progress" class="table-row__td">
              <p class="table-row__progress status status--red">Overdue</p>
            </td>
            <td class="table-row__td">
              <tr class="table-row table-row--ben">
                <td class="table-row__td">
                  <input id="" type="checkbox" class="table__select-row" />
                </td>
                <td class="table-row__td">
                  <div class="table-row__img"></div>
                  <div class="table-row__info">
                    <p class="table-row__name">Ben West</p>
                    <span class="table-row__small">Account manager</span>
                  </div>
                </td>
                <td data-column="Policy" class="table-row__td">
                  <div class="">
                    <p class="table-row__policy">$25,000</p>
                    <span class="table-row__small">Basic Policy</span>
                  </div>
                </td>

                <td data-column="Policy status" class="table-row__td">
                  <p class="table-row__p-status status--yellow status">
                    Awating Approval
                  </p>
                </td>
                <td data-column="destination" class="table-row__td">
                  Boston, US
                </td>
                <td data-column="status" class="table-row__td">
                  <p class="table-row__status status--green status">Active</p>
                </td>
                <td data-column="progress" class="table-row__td">
                  <p class="table-row__progress status--blue status">
                    On track
                  </p>
                </td>
                <td class="table-row__td"></td>
              </tr>

              <tr class="table-row table-row--red table-row--natalie">
                <td class="table-row__td">
                  <div class="table-row--overdue"></div>
                  <input id="" type="checkbox" class="table__select-row" />
                </td>
                <td class="table-row__td">
                  <div class="table-row__img"></div>
                  <div class="table-row__info">
                    <p class="table-row__name">Natalie Quest</p>
                    <span class="table-row__small">Social content manager</span>
                  </div>
                </td>
                <td class="table-row__td">
                  <div class="">
                    <p class="table-row__policy">$30,000</p>
                    <span class="table-row__small">All Inclusive Policy</span>
                  </div>
                </td>
                <td class="table-row__td">
                  <p class="table-row__p-status status--red status">Rejected</p>
                </td>
                <td class="table-row__td">Huston, US</td>
                <td class="table-row__td">
                  <p class="table-row__status">Rejected</p>
                </td>
                <td class="table-row__td">
                  <p class="table-row__progress status--red status">Overdue</p>
                </td>
                <td class="table-row__td"></td>
              </tr>

              <tr class="table-row table-row--thomas">
                <td class="table-row__td">
                  <input id="" type="checkbox" class="table__select-row" />
                </td>
                <td class="table-row__td">
                  <div class="table-row__img"></div>
                  <div class="table-row__info">
                    <p class="table-row__name">Thomas Perez</p>
                    <span class="table-row__small">CEO</span>
                  </div>
                </td>
                <td class="table-row__td">
                  <div class="">
                    <p class="table-row__policy">$45,000</p>
                    <span class="table-row__small">All Inclusive Policy</span>
                  </div>
                </td>
                <td class="table-row__td">
                  <p class="table-row__p-status status--green status">
                    Approved
                  </p>
                </td>
                <td class="table-row__td">New York, US</td>
                <td class="table-row__td">
                  <p class="table-row__status status status--green">Active</p>
                </td>
                <td class="table-row__td">
                  <p class="table-row__progress status status--green">Done</p>
                </td>
                <td class="table-row__td"></td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeesTable',

  setup() {
    return {}
  }
}
</script>
<style lang="scss">
@import '@/styles/switchTheme.scss';

.employees-info {
  width: 100%;
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  @include bg_color('secondaryColor');
  box-shadow: 0 0 #0000, 0 0 #0000, inset 0px 1px 0px hsl(0deg 0% 100% / 10%);
}
.container {
  margin: 25px;
  .table {
    width: 100%;
  }
}
.row__title {
  color: #53646f;
  font-weight: 400;
  font-size: 20px;
  margin: 0;
}

.row--top-40 {
  margin-top: 40px;
}

.table__th {
  color: #9eabb4;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  border: 0 !important;
  padding: 15px 8px !important;
}

.table-row {
  border-bottom: 1px solid #e4e9ea;
  background-color: #fff;
}
.table__th:hover {
  color: #01b9d1;
}

.table--select-all {
  width: 18px;
  height: 18px;
  padding: 0 !important;
  border-radius: 50%;
  border: 2px solid #becad2;
}
.table-row__td {
  padding: 12px 8px !important;
  vertical-align: middle !important;
  color: #53646f;
  font-size: 13px;
  font-weight: 400;
  position: relative;
  line-height: 18px !important;
  border: 0 !important;
}

.table-row__img {
  width: 36px;
  height: 36px;
  display: inline-block;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.table-row--chris .table-row__img {
  background-image: url('https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb');
}

.table-row--angie .table-row__img {
  background-image: url('https://images.pexels.com/photos/785667/pexels-photo-785667.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
}

.table-row--ronald .table-row__img {
  background-image: url('https://images.pexels.com/photos/211050/pexels-photo-211050.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb');
}

.table-row--june .table-row__img {
  background-image: url('https://images.pexels.com/photos/709802/pexels-photo-709802.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb');
}

.table-row--ben .table-row__img {
  background-image: url('https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
}

.table-row--natalie .table-row__img {
  background-image: url('https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
}

.table-row--thomas .table-row__img {
  background-image: url('https://images.pexels.com/photos/415326/pexels-photo-415326.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
}

.table-row__info {
  display: inline-block;
  padding-left: 12px;
  vertical-align: middle;
}

.table-row__name {
  color: #53646f;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 0px;
}

.table-row__small {
  color: #9eabb4;
  font-weight: 300;
  font-size: 12px;
}

.table-row__policy {
  color: #53646f;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 0px;
}
.table-row__p-status {
  margin-bottom: 0;
  font-size: 13px;
  vertical-align: middle;
  display: inline-block;
  color: #9eabb4;
}

.table-row__status {
  margin-bottom: 0;
  font-size: 13px;
  vertical-align: middle;
  display: inline-block;
  color: #9eabb4;
}

.table-row__progress {
  margin-bottom: 0;
  font-size: 13px;
  vertical-align: middle;
  display: inline-block;
  color: #9eabb4;
}

.status:before {
  content: '';
  margin-bottom: 0;
  width: 9px;
  height: 9px;
  display: inline-block;
  margin-right: 7px;
  border-radius: 50%;
}

.status--red:before {
  background-color: #e36767;
}

.status--red {
  color: #e36767;
}

.status--blue:before {
  background-color: #3fd2ea;
}

.status--blue {
  color: #3fd2ea;
}

.status--yellow:before {
  background-color: #ecce4e;
}

.status--yellow {
  color: #ecce4e;
}

.status--green {
  color: #6cdb56;
}
.status--green:before {
  background-color: #6cdb56;
}

.status--grey {
  color: #9eabb4;
}
.status--grey:before {
  background-color: #9eabb4;
}

.table__select-row {
  width: 17px;
  height: 17px;
  margin: 0 0 0 5px !important;
  vertical-align: middle;
  border: 2px solid #beccd7;
  border-radius: 50%;
  cursor: pointer;
}

.table__select-row:hover {
  border-color: #01b9d1;
}

.table__select-row:checked {
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2IDI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNiAyNiIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CiAgPHBhdGggZD0ibS4zLDE0Yy0wLjItMC4yLTAuMy0wLjUtMC4zLTAuN3MwLjEtMC41IDAuMy0wLjdsMS40LTEuNGMwLjQtMC40IDEtMC40IDEuNCwwbC4xLC4xIDUuNSw1LjljMC4yLDAuMiAwLjUsMC4yIDAuNywwbDEzLjQtMTMuOWgwLjF2LTguODgxNzhlLTE2YzAuNC0wLjQgMS0wLjQgMS40LDBsMS40LDEuNGMwLjQsMC40IDAuNCwxIDAsMS40bDAsMC0xNiwxNi42Yy0wLjIsMC4yLTAuNCwwLjMtMC43LDAuMy0wLjMsMC0wLjUtMC4xLTAuNy0wLjNsLTcuOC04LjQtLjItLjN6IiBmaWxsPSIjMDFiOWQxIi8+Cjwvc3ZnPgo=);
  background-position: center;
  background-size: 7px;
  background-repeat: no-repeat;
  border-color: #01b9d1;
}

.table-row--overdue {
  width: 3px;
  background-color: #e36767;
  display: inline-block;
  position: absolute;
  height: calc(100% - 24px);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.table-row__edit {
  width: 46px;
  padding: 8px 17px;
  display: inline-block;
  background-color: #daf3f8;
  border-radius: 18px;
  vertical-align: middle;
  margin-right: 10px;
  cursor: pointer;
}

.table-row__bin {
  width: 16px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.table-row--red {
  background-color: #fff2f2;
}

@media screen and (max-width: 991px) {
  .table__thead {
    display: none;
  }
  .table-row {
    display: inline-block;
    border: 0;
    background-color: #fff;
    width: calc(33.3% - 13px);
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .table-row__img {
    width: 42px;
    height: 42px;
    margin-bottom: 10px;
  }

  .table-row__td:before {
    content: attr(data-column);
    color: #9eabb4;
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    display: block;
  }

  .table-row__info {
    display: block;
    padding-left: 0;
  }

  .table-row__td {
    display: block;
    text-align: center;
    padding: 8px !important;
  }
  .table-row--red {
    background-color: #fff2f2;
  }

  table__select-row:hover {
    border-color: #01b9d1;
  }

  .table__select-row:checked {
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2IDI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNiAyNiIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CiAgPHBhdGggZD0ibS4zLDE0Yy0wLjItMC4yLTAuMy0wLjUtMC4zLTAuN3MwLjEtMC41IDAuMy0wLjdsMS40LTEuNGMwLjQtMC40IDEtMC40IDEuNCwwbC4xLC4xIDUuNSw1LjljMC4yLDAuMiAwLjUsMC4yIDAuNywwbDEzLjQtMTMuOWgwLjF2LTguODgxNzhlLTE2YzAuNC0wLjQgMS0wLjQgMS40LDBsMS40LDEuNGMwLjQsMC40IDAuNCwxIDAsMS40bDAsMC0xNiwxNi42Yy0wLjIsMC4yLTAuNCwwLjMtMC43LDAuMy0wLjMsMC0wLjUtMC4xLTAuNy0wLjNsLTcuOC04LjQtLjItLjN6IiBmaWxsPSIjMDFiOWQxIi8+Cjwvc3ZnPgo=);
    background-position: center;
    background-size: 7px;
    background-repeat: no-repeat;
    border-color: #01b9d1;
  }

  .table-row--overdue {
    width: 100%;
    top: 0;
    left: 0;
    transform: translateY(0%);
    height: 4px;
  }
}

@media screen and (max-width: 680px) {
  .table-row {
    width: calc(50% - 13px);
  }
}

@media screen and (max-width: 480px) {
  .table-row {
    width: 100%;
  }
}
</style>
