export const leaveTypes = [
  { label: 'Casual Leave', leavetype: 'Casual-Leave' },
  { label: 'Sick Leave', leavetype: 'Sick-Leave' },
  { label: 'Earned Leave', leavetype: 'Earned-Leave' },
  { label: 'Privilege Leave', leavetype: 'Privilege-Leave' },
  { label: 'Annual Leave', leavetype: 'Annual-Leave' },
  { label: 'Paid Leave', leavetype: 'Paid-Leave' },
  { label: 'Unpaid Leave', leavetype: 'Unpaid-Leave' },
  { label: 'Leave Without Pay', leavetype: 'Leave-Without-Pay' },
  { label: 'Compensatory Off', leavetype: 'Comp-Off' },
  { label: 'Maternity Leave', leavetype: 'Maternity-Leave' },
  { label: 'Paternity Leave', leavetype: 'Paternity-Leave' },
  { label: 'Adoption Leave', leavetype: 'Adoption-Leave' },
  { label: 'Marriage Leave', leavetype: 'Marriage-Leave' },
  { label: 'Bereavement Leave', leavetype: 'Bereavement-Leave' },
  { label: 'Festival Leave', leavetype: 'Festival-Leave' },
  { label: 'Floating Holiday', leavetype: 'Floating-Holiday' },
  { label: 'Optional Holiday', leavetype: 'Optional-Holiday' },
  { label: 'Work From Home', leavetype: 'Work-From-Home' },
  { label: 'Half Day Leave', leavetype: 'Half-Day-Leave' },
  { label: 'Study Leave', leavetype: 'Study-Leave' },
  { label: 'Sabbatical Leave', leavetype: 'Sabbatical-Leave' },
  { label: 'Special Leave', leavetype: 'Special-Leave' },
  { label: 'Emergency Leave', leavetype: 'Emergency-Leave' },
  { label: 'Loss of Pay', leavetype: 'Loss-Of-Pay' },
  { label: 'Jury Duty Leave', leavetype: 'Jury-Duty-Leave' },
  { label: 'Military Leave', leavetype: 'Military-Leave' }
];


export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB').replace(/\//g, '-');
};