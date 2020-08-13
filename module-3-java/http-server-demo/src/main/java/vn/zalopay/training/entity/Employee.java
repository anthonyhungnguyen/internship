package vn.zalopay.training.entity;

import java.util.Date;

public class Employee {
    private int id;
    private String full_name;
    private String sex;
    private Date dob;
    private Date join_date;
    private String department;

    public Employee() {
    }

    public Employee(String full_name, String sex, Date dob, Date join_date, String department) {
        this.full_name = full_name;
        this.sex = sex;
        this.dob = dob;
        this.join_date = join_date;
        this.department = department;
    }

    public Employee(int id, String full_name, String sex, Date dob, Date join_date, String department) {
        this.id = id;
        this.full_name = full_name;
        this.sex = sex;
        this.dob = dob;
        this.join_date = join_date;
        this.department = department;
    }

    public int getId() {
        return id;
    }

    public String getFull_name() {
        return full_name;
    }

    public String getSex() {
        return sex;
    }

    public Date getDob() {
        return dob;
    }

    public Date getJoin_date() {
        return join_date;
    }

    public String getDepartment() {
        return department;
    }

    public void setId(int id) {

        this.id = id;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public void setJoin_date(Date join_date) {
        this.join_date = join_date;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", full_name='" + full_name + '\'' +
                ", sex='" + sex + '\'' +
                ", dob=" + dob +
                ", join_date=" + join_date +
                ", department='" + department + '\'' +
                '}';
    }
}
