import { afterRender, Component, HostListener, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Portate, Product, display, headers } from '../../../types';
import { allergeneImg } from '../../../assets/utils';
import { filter, pairwise } from 'rxjs';
import { HeadersService } from '../../services/headers.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {


  constructor(
    //includo tutti i services che mi servono e anche l'oggetto Router 
    private productService: ProductsService, //servizio prodotti
    private router: Router,
    private headersService: HeadersService//classe router
  ) {

    afterRender(() => {
      let width = (document.querySelector('#portateDiv') as HTMLElement).clientWidth * this.pages.indexOf(router.url.slice(6));
      (document.querySelector('#portateDiv') as HTMLElement).style.setProperty('right', width + 'px');
      (document.querySelector(`#${router.url.slice(6)}`) as HTMLElement)?.style.setProperty('display', 'flex')
    })

    //al cambio di route eseguo il blocco di codice dentro l'if




    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        //prendo l'id senza lo slash
        const id = event.url.slice(6);
        this.currentUrl = id;
      }
    });
    router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise()).subscribe((events: RoutesRecognized[]) => {
      this.prevUrl = events[0].url.slice(6);
      (document.querySelector(`#${this.currentUrl}`) as HTMLElement)?.style.setProperty('display', 'flex');
      let width = (document.querySelector('#portateDiv') as HTMLElement).clientWidth * this.pages.indexOf(this.currentUrl);
      (document.querySelector('#portateDiv') as HTMLElement).style.setProperty('right', width + 'px');
      setTimeout(() => {
        (document.querySelector(`#${this.prevUrl}`) as HTMLElement).style.setProperty('display', 'none');
      }, 150)

    });
  }
  @HostListener('window:resize', [])
  onResize() {
    let width = (document.querySelector('#portateDiv') as HTMLElement).clientWidth * this.pages.indexOf(this.currentUrl);
    (document.querySelector('#portateDiv') as HTMLElement).style.setProperty('right', width + 'px');
  }

  allergeneImg = allergeneImg

  headers: headers = {
    antipasti: 'ciao'
  }
  prevUrl: string = ''
  currentUrl: string = ''
  products: Portate = {};
  pages: string[] = []
  display: display = {
    value: 'display: none',
    product: undefined,
    setFalse() {
      this.value = 'display: none'
    },
    setTrue(product: Product) {
      this.value = 'display: inline-flex';
      this.product = product
    }
  }





  ngOnInit() {
    //quando il componente viene renderizzato per la prima volta 
    this.headersService.getHeaders().subscribe(headers=>{
      this.headers = headers
    })
    
    this.productService.getPortate().subscribe((response) => {
      this.products = response;
      this.pages = Object.keys(this.products);
      const id = this.router.url.slice(6);
      this.prevUrl = id;
      this.router.navigate([`menu/${id}`], { onSameUrlNavigation: 'reload' })


    })
  }


  nextPage() {
    const id = this.router.url.slice(6)
    if (this.pages.indexOf(id) < this.pages.length - 1) {
      let navigate = this.pages[this.pages.indexOf(id) + 1]
      this.router.navigate([`menu/${navigate}`]);

    }
  }
  prevPage() {
    const id = this.router.url.slice(6)
    if (this.pages.indexOf(id) > 0) {
      let navigate = this.pages[this.pages.indexOf(id) - 1]
      this.router.navigate([`menu/${navigate}`]);
    }
  }


  startX = NaN
  mouseX = NaN
  touchStart(event: any) {
    let x = event.touches[0].clientX
    this.startX = x
  }
  touchEnd(event: any) {
    let startX = this.startX
    let endX = event.changedTouches[0].pageX;
    let deltaX = startX - endX
    if (Math.abs(deltaX) >= 50) {
      if (deltaX > 0) {
        this.nextPage()
      } else if (deltaX < 0) {
        this.prevPage()
      }
    }
  }

  mouseStart(event: any) {
    this.mouseX = event.clientX
  }
  mouseUp(event: any) {
    let endX = event.clientX
    let deltaX = this.mouseX - endX
    if (Math.abs(deltaX) >= 75) {
      if (deltaX > 0) {
        this.nextPage()
      } else if (deltaX < 0) {
        this.prevPage()
      }
    }
  }


}
