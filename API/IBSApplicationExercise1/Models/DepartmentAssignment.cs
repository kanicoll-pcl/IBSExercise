﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace IBSApplicationExercise1.Models;

public partial class DepartmentAssignment
{
    public Guid AssignmentId { get; set; }

    public Guid PeopleId { get; set; }

    public Guid DepartmentId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public string ModifiedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public string AbbrDepartmentNameAssignment { get; set; }

    public virtual Department Department { get; set; }

    public virtual People People { get; set; }
}