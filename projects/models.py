from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse

class project(models.Model):
    '''Model to record the projects details plus the relationship with the members'''
    project_id = models.CharField(max_length=25,unique=True,editable=False)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250,unique=True)
    description = models.TextField(null=True,blank=True)

    # Relationships
    owner = models.ForeignKey(User,related_name="projects",on_delete=models.CASCADE) #superadmin
    # many to many rel through another model
    members = models.ManyToManyField(User,through="projectMembership",blank=True)

    # timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    # meta class
    class Meta:
        ordering = ["-created_at"]

    # class methods
    def save(self,*args,**kwargs):  # define a new unique name for the project
        if not self.project_id:
            # generate unique project id
            last_project = project.objects.filter(
                project_id__startswith = 'OPR-' #OPR stands for orion project
            ).order_by('-id').first()

            if last_project:
                last_num = int(last_project.project_id.split('-')[-1])
                new_num = last_num + 1

            else:
                new_num = 1
            
            self.project_id = f"OPR-{new_num:04d}"

        # gen automatically a slug
        if self.pk:
            old_title = type(self).objects.get(pk = self.pk).title
            if old_title != self.title:
                self.slug = slugify(self.title)
        else:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    # for the absolute url
    # def get_absolute_url(self):
    #     return reverse("projects",kwargs={'slug':self.slug})

    def __str__(self):
        return f"{self.project_id} : {self.title} created on {self.created_at.strftime('%A %B %d,%Y %I:%M %p')}"
        

class projectMembership(models.Model):
    '''This is a through models that records memebrs in a project'''
    ROLES = [
        ("admin","Admin"), #High-level control,can approve data,cofigurations etc
        ("contributor","Contributor") #create ans manage their own data pending apporval from the admin
    ]
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    project = models.ForeignKey(project,on_delete=models.CASCADE)
    role = models.CharField(max_length=50,choices=ROLES,default="contributor")
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ("user","role") # prevent duplicate roles
        indexes = [
            models.Index(fields=['user','project'])
        ]

class projectAPIKey(models.Model):
    '''Storage of the api keys'''
    project = models.OneToOneField(project,related_name="api_key",on_delete=models.CASCADE)
    api_key = models.CharField(max_length=250,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # class meta
    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=['project','api_key'])
        ]
    
    # class methods
    def __str__(self):
        return f"Project key generated for the project: {self.project.title} on {self.created_at.strftime('%A %B %d,%Y %I:%M %p')}"

    
