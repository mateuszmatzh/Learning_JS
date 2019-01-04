/************************************************************************************

Firma X posiada trzy aktualnie biura zlokalizowane w Gdańsku, Gliwicach i Koszalinie, 
a w niedalekiej przyszłości planuje otworzyć nowe biuro w Poznaniu.

Wymagania aplikacji:

Na podstawie dostarczonych danych, proszę stworzyć obiekt `Firma` (company).
`Firma` powinna posiadać listę `Biur` (offices).
`Biuro` powinno posiadać listę `Pracowników` (workers).
Do stworzenia struktury firmy użyj przykładowych danych z tablic workers i offices.


Używając obiektu „Firma” wykonaj następujące operacje (w kolejności):
1. Wyświetl, informację o biurze w Gliwicach (lokalizacja, liczba przypisanych pracowników, średnia pensja),
2. Dodaj nowe biuro (w Poznaniu),
3. Dodaj nowego pracownika do biura w Poznaniu: { id: 16, name: "Olek", type: "M", office: "PO", salary: 500 }
4. Wyświetl, informację o biurze w Poznaniu
5. Wyświetl średnią pensję w całej firmie,
6. Wyświetl najlepiej opłacanego pracownika w poszczególnych biurach,
7. Wyświetl najlepiej opłacanego pracownika w całej firmie oraz nazwę jego biura.

************************************************************************************/

var offices = [
    { id: "GD", name: "Gdańsk", headquarter: true },
    { id: "GL", name: "Gliwice" },
    { id: "KO", name: "Koszalin" }
  ];

var workers = [
  { id: 1,  name: "Bartek",     type: "P", office: "GD", salary: 300 },
  { id: 2,  name: "Wojtek",     type: "P", office: "GD", salary: 210 },
  { id: 3,  name: "Piotr",      type: "M", office: "GL", salary: 250 },
  { id: 4,  name: "Damian",     type: "P", office: "KO", salary: 290 },
  { id: 5,  name: "Jan",        type: "P", office: "GL", salary: 210 },
  { id: 6,  name: "Mateusz",    type: "P", office: "GD", salary: 290 },
  { id: 7,  name: "Weronika",   type: "M", office: "KO", salary: 240 },
  { id: 8,  name: "Gabriela",   type: "M", office: "GD", salary: 290 },
  { id: 9,  name: "Alina",      type: "M", office: "KO", salary: 290 },
  { id: 10, name: "Aleksander", type: "P", office: "GL", salary: 260 },
  { id: 11, name: "Tomek",      type: "P", office: "GD", salary: 200 },
  { id: 12, name: "Krzysztof",  type: "M", office: "KO", salary: 290 },
  { id: 13, name: "Marcin",     type: "P", office: "GD", salary: 280 },
  { id: 14, name: "Agata",      type: "P", office: "GD", salary: 230 },
  { id: 15, name: "Magda",      type: "P", office: "KO", salary: 220 }
];

/************************************************************************************/

var company = { offices: [] }

function orderOffices(){
  offices.forEach(function(office) {
    company.offices.push({ 
      id: office.id,
      name: office.name, 
      workers: workers.filter(worker => worker.office === office.id),
      officeBestWorker: function(){
        return this.workers.slice().sort((a,b) => b.salary-a.salary)[0];
      },
      officeAverageSalary: function(){
        let result = this.workers.reduce((a,b) => { 
          return a + b.salary }, 0) / this.workers.length;
        return result; 
      }
    });
  });
}
orderOffices();


// 1. Wyświetl, informację o biurze w Gliwicach (lokalizacja, liczba przypisanych pracowników, średnia pensja),

  
  console.log(`1) Biuro w mieście ${company.offices[1].name} : Liczba pracowników: ${company.offices[1].workers.length}, Średnia pensja: ${company.offices[1].officeAverageSalary()}`);


// 2. Dodaj nowe biuro (w Poznaniu)

  company.offices.push({ id: "PO", name: "Poznań" });
  // console.log('2)', company.offices[3]);
  console.log('2)', company);


// 3. Dodaj nowego pracownika do biura w Poznaniu: { id: 16, name: "Olek", type: "M", office: "PO", salary: 500 }

  company.offices[3].worker = [{ 
    id: 16, 
    name: "Olek", 
    type: "M", 
    office: "PO", 
    salary: 500, 
  }];
  console.log('3)', company.offices[3].worker);


// 4. Wyświetl, informację o biurze w Poznaniu 

  console.log(`4) Biuro w mieście ${company.offices[3].name}: Liczba pracownikow: ${company.offices[3].worker.length}, Średnia pensja: ` /*${company.offices[3].officeAverageSalary()}*/);
    

// 5. Wyświetl średnią pensję w całej firmie
  
  function companyAverageSalary(){
    let result = 
      workers.reduce((a,b) => { return a + b.salary }, 0) / workers.length;
    return result;
  }
  console.log(`5) Średnia pensja w całej firmie wynosi ${companyAverageSalary()}`);


// 7. Wyświetl najlepiej opłacanego pracownika w całej firmie oraz nazwę jego biura.

  const bestWorker = workers.slice().sort((a,b) => b.salary-a.salary)[0];
  const bestWorkersOffice = offices.find(office => office.id === bestWorker.office).name;
  console.log('7) Najlepiej opłacanym pracownikiem w całej firmie jest', bestWorker.name, 'z miasta', bestWorkersOffice, '.');


// 6. Wyświetl najlepiej opłacanego pracownika w poszczególnych biurach

  company.offices.forEach(office => 
    console.log(`6) Najlepiej opłacany pracownik w mieście: ${office.name} to: `,office.officeBestWorker()));


